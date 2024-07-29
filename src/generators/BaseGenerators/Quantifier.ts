import type Config from "../../Config";

type QuantifierOptions = {
	min: number;
	max: number;
	greedy: boolean;
};

const WEIGHTING = {
	GREEDY: 0.7,
	LAZY: 0.15,
};

class Quantifier {
	private config: Config | null = null;
	private options: QuantifierOptions;

	constructor(opts: QuantifierOptions) {
		this.options = opts;
	}

	toString() {
		let range: string;
		if (this.options.min === this.options.max) {
			range = `${this.options.min} ${this.options.min > 1 ? "times" : "time"}`;
		} else {
			range = `${this.options.min}-${this.options.max} times`;
		}
		return `${range}${this.options.greedy ? " (greedy)" : ""}`;
	}

	setConfig(config: Config | null) {
		this.config = config;
	}

	repeat(generator: () => string) {
		if (!this.config) {
			throw new Error("Config not set");
		}
		let { max } = this.options;
		if (max === Number.POSITIVE_INFINITY) {
			max = this.config?.settings.quantifier.max || max;
		}
		const weight = this.options.greedy ? WEIGHTING.GREEDY : WEIGHTING.LAZY;
		const times =
			Math.floor(this.config.rng.get(weight) * (max - this.options.min + 1)) +
			this.options.min;
		let str = "";
		for (let i = 0; i < times; i++) {
			str += generator();
		}
		return str;
	}
}

export default Quantifier;
