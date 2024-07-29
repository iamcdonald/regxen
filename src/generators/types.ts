import type AlternativeGenerator from "./AlternativeGenerator";
import type CharacterClassGenerator from "./CharacterClassGenerator";
import type { RangeGenerator } from "./CharacterClassGenerator";
import type GroupGenerator from "./GroupGenerator";
import type GroupReferenceGenerator from "./GroupReferenceGenerator";
import type LiteralGenerator from "./LiteralGenerator";
import type MetaGenerator from "./MetaGenerator";
import type PatternGenerator from "./PatternGenerator";

export type Generator =
	| AlternativeGenerator
	| CharacterClassGenerator
	| GroupGenerator
	| GroupReferenceGenerator
	| LiteralGenerator
	| MetaGenerator
	| RangeGenerator
	| PatternGenerator;

export type Quantifier = {
	min: number;
	max: number;
	greedy: boolean;
};
