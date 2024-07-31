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
];
