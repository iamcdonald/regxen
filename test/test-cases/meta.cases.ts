export default [
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
	},
	{
		regex: /\p{Script=Hiragana}/u,
		description: "property - with key & value",
	},
	{
		regex: /\D/,
		description: "digit - negate",
	},
	{
		regex: /\W/,
		description: "word - negate",
	},
	{
		regex: /\S/,
		description: "white-space - negate",
	},
	{
		regex: /\P{ASCII}/u,
		description: "property (lone) - negate",
	},
	{
		regex: /\P{Script=Hiragana}/u,
		description: "property (with key & value) - negate",
	},
];
