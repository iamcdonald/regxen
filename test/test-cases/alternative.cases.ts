import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    regex: /a|b/,
    description: "letter",
  },
  {
    regex: /\u{1F44B}HI|BYE\u{1F44D}/u,
    description: "unicode",
  },
];

export default cases;
