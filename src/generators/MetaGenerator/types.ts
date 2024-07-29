import type {
	AnyCharacterSet,
	EscapeCharacterSet,
	UnicodePropertyCharacterSet,
} from "@eslint-community/regexpp/ast";

type Kind =
	| AnyCharacterSet["kind"]
	| EscapeCharacterSet["kind"]
	| UnicodePropertyCharacterSet["kind"];

export type Meta = {
	kind: Kind;
	negate?: boolean;
	value?: string;
	key?: string;
};
