import { expect, test } from "vitest";
import type { Flag } from "../src/flags";
import flags from "../src/flags";
import RegXenProxy from "./RegXenProxy";
import testcases, { type RegExpParts } from "./test-cases";

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

for (const key of Object.keys(testcases)) {
  for (const { regex, description, options, checkOutput } of testcases[key]) {
    let regexi: RegExp;
    let optionsi:
      | {
          unicode: {
            filter: RegExp;
          };
        }
      | undefined;
    let checkOutputi: RegExp | undefined;
    let skip = false;
    try {
      regexi = buildRegExp(regex);
      optionsi = options && {
        unicode: {
          filter: buildRegExp(options.unicode.filter),
        },
      };
      checkOutputi = checkOutput && buildRegExp(checkOutput);
    } catch (e) {
      skip = true;
    }
    test(
      `${key}: ${truncate(`/${regex.source}/${(regex.flags || [])?.join("")}`)} | ${description}`,
      { skip },
      () => {
        const rgxn = new RegXen(regexi, optionsi);
        for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
          expect(rgxn.generate()).toMatch(checkOutputi || regexi);
        }
      },
    );
  }
}
