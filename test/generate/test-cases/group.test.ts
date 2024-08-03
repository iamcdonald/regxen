import TestCaseRunner from "../TestCaseRunner";
import type { TestCase } from "../types";

const cases: TestCase[] = [
  {
    regex: { source: "(HI[A-Z]*)?" },
    description: "simple",
  },
  {
    regex: { source: "(HI[A-Z]*)(x)\\1" },
    description: "reference - number",
  },
  {
    regex: { source: "(?<name>HI[A-Z]*)\\k<name>" },
    description: "reference - named",
  },
];

new TestCaseRunner({ name: "group", cases }).run();
