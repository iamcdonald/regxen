import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    regex: { source: "[ABGI]" },
    description: "list",
  },
  {
    regex: { source: "[\\u{1F3FB}\\u{1F3FC}\\u{1F3FD}]", flags: ["v"] },
    description: "list - unicode",
  },
  {
    regex: { source: "[a-b]" },
    description: "range",
    checkOutput: { source: "a|b" },
  },
  {
    regex: { source: "[a-g]" },
    description:
      "range - should only chose from valid code points within range",
    options: {
      unicode: {
        filter: { source: "[^b-f]" },
      },
    },
    checkOutput: { source: "[ag]" },
  },
  {
    regex: { source: "[\\d]" },
    description: "meta",
  },
  {
    regex: { source: "[^ABG]" },
    description: "list - negated",
    options: {
      unicode: {
        filter: { source: "[ABGF]" },
      },
    },
    checkOutput: { source: "F" },
  },
  {
    regex: { source: "[^a-y]" },
    description: "range - negated",
    options: {
      unicode: {
        filter: { source: "[a-z]" },
      },
    },
    checkOutput: { source: "z" },
  },
  {
    regex: { source: "[^\\d]" },
    description: "meta - negated",
    options: {
      unicode: {
        filter: { source: "[0-9A]" },
      },
    },
    checkOutput: { source: "A" },
  },
];

export default cases;
