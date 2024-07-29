export * from "./types";
import { default as alternative } from "./alternative.cases";
import { default as characterClass } from "./character-class.cases";
import { default as complex } from "./complex.cases";
import { default as group } from "./group.cases";
import { default as literal } from "./literal.cases";
import { default as meta } from "./meta.cases";
import type { TestCase } from "./types";

const cases: Record<string, TestCase[]> = {
	meta,
	literal,
	"character class": characterClass,
	alternative,
	group,
	complex,
};

export default cases;
