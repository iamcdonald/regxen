import type RandomNumber from "../RandomNumber";
import Unicode from "../Unicode";
import * as defaults from "./defaults";
import type { Settings } from "./types";

class Config {
	readonly settings: Settings = {
		quantifier: defaults.quantifier,
	};
	readonly rng: RandomNumber;
	groupValues: Record<string | number, string> = {};
	readonly unicode: Unicode;
	constructor(rng: RandomNumber, settings: Partial<Settings> = {}) {
		this.rng = rng;
		this.settings = {
			...this.settings,
			...settings,
		};
		this.unicode = new Unicode(this.settings.unicode);
	}
}

export default Config;
