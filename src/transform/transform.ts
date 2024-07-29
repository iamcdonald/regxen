import {
  type AST,
  parseRegExpLiteral,
  visitRegExpAST,
} from "@eslint-community/regexpp";
import type { RegExpVisitor } from "@eslint-community/regexpp/visitor";
import {
  AlternativeGenerator,
  AlternativeOptionGenerator,
  CharacterClassGenerator,
  GroupGenerator,
  GroupReferenceGenerator,
  LiteralGenerator,
  MetaGenerator,
  PatternGenerator,
  Quantifier,
  RangeGenerator,
} from "../generators";
import Gatherer from "./Gatherer";

type Replace<
  T extends string,
  S extends string,
  D extends string,
  A extends string = "",
> = T extends `${infer L}${S}${infer R}`
  ? Replace<R, S, D, `${A}${L}${D}`>
  : `${A}${T}`;

type HandlerTypes = Replace<
  Replace<keyof RegExpVisitor.Handlers, "Enter", "">,
  "Leave",
  ""
>;

const ignoredNodes: HandlerTypes[] = [
  "onAssertion", // (?=a) | (?!a) | (?<=a) | (?<!a)
  "onClassIntersection", // [a&&b]
  "onClassStringDisjunction", // \q{a|b}
  "onClassSubtraction", // [a--b]
  "onStringAlternative", // \q{alt}
  "onExpressionCharacterClass", // [a--b] | [a&&b] | [^a--b] | [^a&&b]`
  "onFlags", // regexp flags
];

const transform = (
  regex: RegExp,
  pattern: PatternGenerator,
): PatternGenerator => {
  const gatherer = new Gatherer(pattern);

  const ast = parseRegExpLiteral(regex);

  visitRegExpAST(ast, {
    onAlternativeEnter: (node) => {
      gatherer.enter(new AlternativeGenerator());
      gatherer.enter(new AlternativeOptionGenerator());
    },
    onAlternativeLeave: () => {
      gatherer.leave((g) => g instanceof AlternativeOptionGenerator);
      gatherer.leave((g) => g instanceof AlternativeGenerator);
    },
    onBackreferenceEnter: (node) => {
      gatherer.enter(new GroupReferenceGenerator({ reference: node.ref }));
    },
    onBackreferenceLeave: () => {
      gatherer.leave((g) => g instanceof GroupReferenceGenerator);
    },
    onCapturingGroupEnter: (node) => {
      gatherer.enter(
        new GroupGenerator({
          capture: true,
          references: node.references.map((r) => r.ref),
        }),
      );
    },
    onCapturingGroupLeave: () => {
      gatherer.leave((g) => g instanceof GroupGenerator);
    },
    onCharacterEnter: (node) => {
      gatherer.enter(new LiteralGenerator({ char: node.value }));
    },
    onCharacterLeave: () => {
      gatherer.leave((g) => g instanceof LiteralGenerator);
    },
    onCharacterClassEnter: (node) => {
      gatherer.enter(new CharacterClassGenerator({ negated: node.negate }));
    },
    onCharacterClassLeave: () => {
      gatherer.leave((g) => g instanceof CharacterClassGenerator);
    },
    onCharacterClassRangeEnter: (node) => {
      gatherer.enter(
        new RangeGenerator({ start: node.min.value, end: node.max.value }),
      );
      gatherer.pause();
    },
    onCharacterClassRangeLeave: () => {
      gatherer.listen();
      gatherer.leave((g) => g instanceof RangeGenerator);
    },
    onCharacterSetEnter: (node) => {
      gatherer.enter(
        new MetaGenerator({
          kind: node.kind,
          negate: node.kind !== "any" ? node.negate : undefined,
          value: node.kind === "property" ? node.value || undefined : undefined,
          key: node.kind === "property" ? node.key : undefined,
        }),
      );
    },
    onCharacterSetLeave: () => {
      gatherer.leave((g) => g instanceof MetaGenerator);
    },
    onGroupEnter: (node) => {
      gatherer.enter(new GroupGenerator());
    },
    onGroupLeave: () => {
      gatherer.leave((g) => g instanceof GroupGenerator);
    },
    onQuantifierEnter: (node) => {
      gatherer.setCurrentQuantifier(
        new Quantifier({
          min: node.min,
          max: node.max,
          greedy: node.greedy,
        }),
      );
    },
    onQuantifierLeave: (node) => {},
    onPatternEnter: (node) => {
      gatherer.enter(new PatternGenerator());
    },
    onPatternLeave: (node) => {
      gatherer.leave((g) => g instanceof PatternGenerator);
    },

    // noop
    onRegExpLiteralEnter: (node) => {},
    onRegExpLiteralLeave: (node) => {},

    //ignore
    ...ignoredNodes.reduce((agg: RegExpVisitor.Handlers, node) => {
      agg[`${node}Enter`] = () => gatherer.pause();
      agg[`${node}Leave`] = () => gatherer.listen();
      return agg;
    }, {}),
  });
  return gatherer.pattern;
};

export default transform;
