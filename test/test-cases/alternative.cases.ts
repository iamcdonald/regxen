import type { TestCase } from "./types";

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

export default cases;
