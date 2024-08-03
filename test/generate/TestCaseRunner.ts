import { expect, test } from "vitest";
import type { Flag } from "../../src/flags";
import flags from "../../src/flags";
import RegXenProxy from "./../RegXenProxy";
import type { RegExpParts, TestCase } from "./types";

const RegXen = await RegXenProxy.get();

const ITERATIONS_PER_TEST = 10;

const truncate = (str: string, length = 16) => {
  if (str.length > length) {
    return `${str.slice(0, length - 3)}...`;
  }
  return str;
};

const doesRuntimeSupportRegExpFlag = (flag: Flag): boolean => {
  try {
    new RegExp("", flag);
    return true;
  } catch (e) {
    return false;
  }
};

const SUPPORTED_FLAGS = {
  u: doesRuntimeSupportRegExpFlag("u"),
  v: doesRuntimeSupportRegExpFlag("v"),
};

const buildRegExp = (regex: RegExpParts): RegExp => {
  if (!regex.flags?.length || !flags.hasUnicode(regex.flags)) {
    return new RegExp(regex.source, regex.flags?.join(""));
  }
  if (!SUPPORTED_FLAGS.u && !SUPPORTED_FLAGS.v) {
    throw new Error(
      "Skip test as runtime does not support unicode flags in RegExp",
    );
  }
  if (!SUPPORTED_FLAGS.v && regex.flags.includes("v")) {
    return new RegExp(
      regex.source,
      regex.flags.map((f) => (f === "v" ? "u" : f)).join(),
    );
  }
  return new RegExp(regex.source, regex.flags?.join(""));
};

type ParsedTestCase = Pick<TestCase, "description"> & {
  regex?: RegExp;
  options?: {
    unicode: {
      filter: RegExp;
    };
  };
  checkOutput?: RegExp;
  skip: boolean;
};

const parseTestCase = ({
  regex,
  options,
  description,
  checkOutput,
}: TestCase): ParsedTestCase => {
  let regexi: RegExp;
  let optionsi:
    | {
        unicode: {
          filter: RegExp;
        };
      }
    | undefined;
  let checkOutputi: RegExp | undefined;
  try {
    regexi = buildRegExp(regex);
    optionsi = options && {
      unicode: {
        filter: buildRegExp(options.unicode.filter),
      },
    };
    checkOutputi = checkOutput && buildRegExp(checkOutput);
    return {
      regex: regexi,
      options: optionsi,
      checkOutput: checkOutputi,
      description,
      skip: false,
    };
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw e;
    }
    return {
      description,
      skip: true,
    };
  }
};

class TestCaseRunner {
  private name: string;
  private cases: TestCase[];
  constructor({ name, cases }: { name: string; cases: TestCase[] }) {
    this.name = name;
    this.cases = cases;
  }

  run() {
    for (const tc of this.cases) {
      const { description, regex, checkOutput, options, skip } =
        parseTestCase(tc);
      const regexStr =
        regex?.toString() ||
        `/${tc.regex.source}/${(tc.regex.flags || [])?.join("")}`;
      test(
        `${this.name}: ${truncate(regexStr)} | ${description}`,
        { skip },
        () => {
          if (!regex) {
            throw new Error(" Should be skipped");
          }
          const rgxn = new RegXen(regex, options);
          for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
            expect(rgxn.generate()).toMatch(checkOutput || regex);
          }
        },
      );
    }
  }
}

export default TestCaseRunner;
