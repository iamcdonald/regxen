export default [
	{
		regex: /(HI[A-Z]*)?/,
		description: "simple",
	},
	{
		regex: /(HI[A-Z]*)(x)\1/,
		description: "reference - number",
	},
	{
		regex: /(?<name>HI[A-Z]*)\k<name>/,
		description: "reference - named",
	},
	{
		// positive lookahead group is ignored
		// returns: NOPE
		regex: /(?=NO_SHOW)NOPE/,
		description: "assertion - positive lookahead (ignored)",
		checkOutput: /NOPE/,
	},
	{
		// negative lookahead group is ignored
		// returns: NO_SHOW
		regex: /(?!NO_SHOW)NO_SHOW/,
		description: "assertion - negative lookahead (ignored)",
		checkOutput: /NO_SHOW/,
	},
	{
		// positive lookbehind group is ignored
		// returns: NOPE
		regex: /NOPE(?<=NO_SHOW)/,
		description: "assertion - positive lookbehind (ignored)",
		checkOutput: /NOPE/,
	},
	{
		// negative lookbehind group is ignored
		// returns: NO_SHOW
		regex: /NO_SHOW(?<!NO_SHOW)/,
		description: "assertion - negative lookbehind (ignored)",
		checkOutput: /NO_SHOW/,
	},
];
