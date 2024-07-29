import AlternativeGenerator from "../AlternativeGenerator";
import { ParentGenerator } from "../BaseGenerators";
import CharacterClassGenerator from "../CharacterClassGenerator";
import GroupGenerator from "../GroupGenerator";
import GroupReferenceGenerator from "../GroupReferenceGenerator";
import LiteralGenerator from "../LiteralGenerator";
import MetaGenerator from "../MetaGenerator";

class AlternativeOptionGenerator extends ParentGenerator<
	| AlternativeGenerator
	| GroupGenerator
	| GroupReferenceGenerator
	| CharacterClassGenerator
	| LiteralGenerator
	| MetaGenerator
> {
	protected validChildren = [
		AlternativeGenerator,
		GroupGenerator,
		GroupReferenceGenerator,
		LiteralGenerator,
		CharacterClassGenerator,
		MetaGenerator,
	];

	generator(): string {
		return [...this.entries].map((e) => e.generate()).join("");
	}
}

export default AlternativeOptionGenerator;
