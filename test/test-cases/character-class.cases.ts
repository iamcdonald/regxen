export default [
  {
    regex: /[\u{1F3FB}\u{1F3FC}\u{1F3FD}]/u,
    description: "list",
  },
  {
    regex: /[3-z]/,
    description: "range",
  },
  {
    regex: /[\p{Script=Hiragana}]/u,
    description: "meta",
  },
  {
    regex: /[^\u{1F3FB}\u{1F3FC}\u{1F3FD}]/v,
    description: "list - negated",
  },
  {
    regex: /[^0-z]/,
    description: "range - negated",
  },
  {
    regex: /[^\p{Script=Hiragana}\p{ASCII}]/u,
    description: "meta - negated",
  },
];
