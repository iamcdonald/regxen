import TestCaseRunner from "../TestCaseRunner";
import type { TestCase } from "../types";

const cases: TestCase[] = [
  {
    regex: { source: "\\d" },
    description: "digit",
  },
  {
    regex: { source: "\\w" },
    description: "word",
  },
  {
    regex: { source: "\\s" },
    description: "white-space",
  },
  {
    regex: { source: "." },
    description: "any",
  },
  {
    regex: { source: "\\p{ASCII}", flags: ["v"] },
    description: "property - lone",
    options: {
      unicode: {
        filter: { source: "[A\\u{1F3FB}]", flags: ["v"] },
      },
    },
    checkOutput: { source: "A" },
  },
  {
    regex: { source: "\\p{Script=Hiragana}", flags: ["v"] },
    description: "property - with key & value",
    options: {
      unicode: {
        filter: { source: "[A-Zを]", flags: ["v"] },
      },
    },
    checkOutput: { source: "を" },
  },
  {
    regex: { source: "\\D" },
    description: "digit - negate",
    options: {
      unicode: {
        filter: { source: "[\\dA]" },
      },
    },
    checkOutput: { source: "A" },
  },
  {
    regex: { source: "\\W" },
    description: "word - negate",
    options: {
      unicode: {
        filter: { source: "[\\w{]" },
      },
    },
    checkOutput: { source: "{" },
  },
  {
    regex: { source: "\\S" },
    description: "white-space - negate",
    options: {
      unicode: {
        filter: { source: "[\\s{]" },
      },
    },
    checkOutput: { source: "{" },
  },
  {
    regex: { source: "\\P{ASCII}", flags: ["v"] },
    description: "property (lone) - negate",
    options: {
      unicode: {
        filter: { source: "[\\p{ASCII}\\u{1F3FB}]", flags: ["v"] },
      },
    },
    checkOutput: { source: "\\u{1F3FB}", flags: ["v"] },
  },
  {
    regex: { source: "\\P{Script=Hiragana}", flags: ["v"] },
    description: "property (with key & value) - negate",
    options: {
      unicode: {
        filter: { source: "[\\p{Script=Hiragana}A]", flags: ["v"] },
      },
    },
    checkOutput: { source: "A" },
  },
];

new TestCaseRunner({ name: "meta", cases }).run();
