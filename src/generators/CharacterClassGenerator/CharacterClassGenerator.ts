import { ParentGenerator } from "../BaseGenerators";
import LiteralGenerator from "../LiteralGenerator";
import MetaGenerator from "../MetaGenerator";
import RangeGenerator from "./RangeGenerator";

export interface ICharacterClassChild {
	getCodePoints(): number[];
}

class CharacterClassGenerator extends ParentGenerator<
	RangeGenerator | LiteralGenerator | MetaGenerator,
	ICharacterClassChild
> {
	protected validChildren = [RangeGenerator, LiteralGenerator, MetaGenerator];
	private negated: boolean;
	private codePoints: number[] | null = null;
	constructor({ negated }: { negated: boolean }) {
		super();
		this.negated = negated;
	}

	toString() {
		return super.toString({ negated: this.negated });
	}

	generator() {
		if (!this.codePoints) {
			let codePoints = [...this.entries].flatMap((e) => e.getCodePoints());
			if (this.negated) {
				codePoints = this.getConfig().unicode.negateCodePointSet(codePoints);
			}
			this.codePoints = codePoints;
		}
		return String.fromCodePoint(
			this.codePoints[
				Math.floor(this.getConfig().rng.get() * this.codePoints.length)
			],
		);
	}
}

export default CharacterClassGenerator;
