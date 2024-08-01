export default [
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
