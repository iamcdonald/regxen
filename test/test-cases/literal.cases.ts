import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    regex: /a/,
    description: "letter",
  },
  {
    regex: /\u{1F3FB}/u,
    description: "unicode",
  },
];

export default cases;
