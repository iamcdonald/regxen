import { ChildGenerator } from "./BaseGenerators";
import type { ICharacterClassChild } from "./CharacterClassGenerator";

class LiteralGenerator extends ChildGenerator implements ICharacterClassChild {
	private char: number;
	constructor({ char }: { char: number }) {
		super();
		this.char = char;
	}

	toString() {
		return super.toString({ char: String.fromCodePoint(this.char) });
	}

	getCodePoints() {
		return [this.char];
	}

	generator() {
		return String.fromCodePoint(this.char);
	}
}

export default LiteralGenerator;
