import TestCaseRunner from "../TestCaseRunner";
import type { TestCase } from "../types";

const cases: TestCase[] = [
  {
    regex: { source: "a|b" },
    description: "letter",
  },
  {
    regex: { source: "\\u{1F44B}HI|BYE\\u{1F44D}", flags: ["v"] },
    description: "unicode",
  },
];

new TestCaseRunner({ name: "alternative", cases }).run();
