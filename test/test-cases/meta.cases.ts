import type { TestCase } from "./types";

const cases: TestCase[] = [
  {
    regex: /\d/,
    description: "digit",
  },
  {
    regex: /\w/,
    description: "word",
  },
  {
    regex: /\s/,
    description: "white-space",
  },
  {
    regex: /./,
    description: "any",
  },
  {
    regex: /\p{ASCII}/u,
    description: "property - lone",
    options: {
      unicode: {
        filter: /[A\u{1F3FB}]/v,
      },
    },
    checkOutput: /A/,
  },
  {
    regex: /\p{Script=Hiragana}/v,
    description: "property - with key & value",
    options: {
      unicode: {
        filter: /[A-Zを]/v,
      },
    },
    checkOutput: /を/,
  },
  {
    regex: /\D/,
    description: "digit - negate",
    options: {
      unicode: {
        filter: /[\dA]/,
      },
    },
    checkOutput: /A/,
  },
  {
    regex: /\W/,
    description: "word - negate",
    options: {
      unicode: {
        filter: /[\w{]/,
      },
    },
    checkOutput: /{/,
  },
  {
    regex: /\S/,
    description: "white-space - negate",
    options: {
      unicode: {
        filter: /[\s\{]/v,
      },
    },
    checkOutput: /{/,
  },
  {
    regex: /\P{ASCII}/v,
    description: "property (lone) - negate",
    options: {
      unicode: {
        filter: /[\p{ASCII}\u{1F3FB}]/v,
      },
    },
    checkOutput: /\u{1F3FB}/v,
  },
  {
    regex: /\P{Script=Hiragana}/v,
    description: "property (with key & value) - negate",
    options: {
      unicode: {
        filter: /[\p{Script=Hiragana}A]/v,
      },
    },
    checkOutput: /A/,
  },
];

export default cases;
