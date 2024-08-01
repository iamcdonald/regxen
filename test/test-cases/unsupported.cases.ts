import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    // positive lookahead group is ignored
    // returns: NOPE
    regex: { source: "(?=NO_SHOW)NOPE" },
    description: "assertion - positive lookahead (ignored)",
    checkOutput: { source: "NOPE" },
  },
  {
    // negative lookahead group is ignored
    // returns: NO_SHOW
    regex: { source: "(?!NO_SHOW)NO_SHOW" },
    description: "assertion - negative lookahead (ignored)",
    checkOutput: { source: "NO_SHOW" },
  },
  {
    // positive lookbehind group is ignored
    // returns: NOPE
    regex: { source: "NOPE(?<=NO_SHOW)" },
    description: "assertion - positive lookbehind (ignored)",
    checkOutput: { source: "NOPE" },
  },
  {
    // negative lookbehind group is ignored
    // returns: NO_SHOW
    regex: { source: "NO_SHOW(?<!NO_SHOW)" },
    description: "assertion - negative lookbehind (ignored)",
    checkOutput: { source: "NO_SHOW" },
  },
  {
    // character class intersection is ignored
    regex: { source: "[[AB]&&[BC]]", flags: ["v"] },
    description: "character class - intersection (ignored)",
    checkOutput: { source: "^.{0}$" }, // should produce "B"
  },
  {
    // character class subtraction is ignored
    regex: { source: "[[AB]--[ABC]]", flags: ["v"] },
    description: "character class - intersection (ignored)",
    checkOutput: { source: "^.{0}$" }, // should produce "C"
  },
  {
    // character class subtraction is ignored
    regex: { source: "[[AB]--[ABC]]", flags: ["v"] },
    description: "character class - intersection (ignored)",
    checkOutput: { source: "^.{0}$" }, // should produce "C"
  },
];

export default cases;
