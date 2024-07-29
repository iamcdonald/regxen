import type { Settings } from "../../src/Config";

export type TestCase = {
	regex: string | RegExp;
	description: string;
	options?: Settings;
	checkOutput?: RegExp;
};
