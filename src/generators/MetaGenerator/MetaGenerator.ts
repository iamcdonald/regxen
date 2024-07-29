import { ChildGenerator } from "../BaseGenerators";
import options from "./options";
import type { Meta } from "./types";

class MetaGenerator extends ChildGenerator {
	private meta: Meta;
	constructor({ kind, negate, value, key }: Meta) {
		super();
		this.meta = { kind, negate, key, value };
	}

	toString() {
		return super.toString(this.meta);
	}

	getCodePoints() {
		return options.get(this.meta, this.getConfig().unicode);
	}

	generator() {
		const codePoints = this.getCodePoints();
		return String.fromCodePoint(
			codePoints[Math.floor(this.getConfig().rng.get() * codePoints.length)],
		);
	}
}

export default MetaGenerator;
