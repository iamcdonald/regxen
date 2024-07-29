import type { UnicodeOptions } from "../Unicode";

export type QuantifierOptions = {
	max: number;
};

export type Settings = {
	quantifier: QuantifierOptions;
	unicode?: UnicodeOptions;
};
