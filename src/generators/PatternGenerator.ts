import AlternativeGenerator from "./AlternativeGenerator";
import { ParentGenerator } from "./BaseGenerators";
import CharacterClassGenerator from "./CharacterClassGenerator";
import GroupGenerator from "./GroupGenerator";
import GroupReferenceGenerator from "./GroupReferenceGenerator";
import LiteralGenerator from "./LiteralGenerator";

class PatternGenerator extends ParentGenerator<
	| GroupGenerator
	| GroupReferenceGenerator
	| AlternativeGenerator
	| CharacterClassGenerator
	| LiteralGenerator
	| PatternGenerator
> {
	protected validChildren = [
		GroupGenerator,
		AlternativeGenerator,
		GroupReferenceGenerator,
		LiteralGenerator,
		CharacterClassGenerator,
		PatternGenerator,
	];
	generator(): string {
		return [...this.entries].map((e) => e.generate()).join("");
	}
}

export default PatternGenerator;
