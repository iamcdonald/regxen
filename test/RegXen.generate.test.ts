import { expect, test } from "vitest";
import RegXenProxy from "./RegXenProxy";
import testcases from "./test-cases";

const RegXen = await RegXenProxy.get();

const ITERATIONS_PER_TEST = 10;

const truncate = (str: string, length = 16) => {
  if (str.length > length) {
    return `${str.slice(0, length - 3)}...`;
  }
  return str;
};

for (const key of Object.keys(testcases)) {
  for (const { regex, description, options, checkOutput } of testcases[key]) {
    test(`${key}: ${truncate(regex.toString())} | ${description}`, () => {
      const rgxn = new RegXen(regex, options);
      for (let i = 0; i < ITERATIONS_PER_TEST; i++) {
        expect(rgxn.generate()).toMatch(checkOutput || regex);
      }
    });
  }
}
