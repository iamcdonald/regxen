import TestCaseRunner from "../TestCaseRunner";
import type { TestCase } from "../types";

const cases: TestCase[] = [
  {
    regex: { source: "a" },
    description: "letter",
  },
  {
    regex: { source: "\\u{1F3FB}", flags: ["v"] },
    description: "unicode",
  },
];

new TestCaseRunner({ name: "literal", cases }).run();