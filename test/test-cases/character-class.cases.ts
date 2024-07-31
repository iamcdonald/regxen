import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    regex: /[ABGI]/,
    description: "list",
  },
  {
    regex: /[\u{1F3FB}\u{1F3FC}\u{1F3FD}]/v,
    description: "list - unicode",
  },
  {
    regex: /[a-b]/,
    description: "range",
    checkOutput: /a|b/,
  },
  {
    regex: /[\d]/,
    description: "meta",
  },
  {
    regex: /[^ABG]/,
    description: "list - negated",
    options: {
      unicode: {
        filter: /[ABGF]/,
      },
    },
    checkOutput: /F/,
  },
  {
    regex: /[^a-y]/,
    description: "range - negated",
    options: {
      unicode: {
        filter: /[a-z]/,
      },
    },
    checkOutput: /z/,
  },
  {
    regex: /[^\d]/,
    description: "meta - negated",
    options: {
      unicode: {
        filter: /[0-9A]/,
      },
    },
    checkOutput: /A/,
  },
];

export default cases;
