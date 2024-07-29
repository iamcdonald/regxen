import type {
  AlternativeOptionGenerator,
  CharacterClassGenerator,
  ChildGenerator,
  GroupGenerator,
  GroupReferenceGenerator,
  LiteralGenerator,
  MetaGenerator,
  PatternGenerator,
  Quantifier,
  RangeGenerator,
} from "../generators";
import { AlternativeGenerator, ParentGenerator } from "../generators";

export type Generator =
  | AlternativeGenerator
  | AlternativeOptionGenerator
  | CharacterClassGenerator
  | GroupGenerator
  | GroupReferenceGenerator
  | LiteralGenerator
  | MetaGenerator
  | PatternGenerator
  | RangeGenerator;

class Gatherer {
  public pattern: PatternGenerator;
  private stack: Generator[] = [];
  private currentQuantifier: Quantifier | null = null;
  private alt: AlternativeGenerator | null = null;
  private paused = 0;

  constructor(pattern: PatternGenerator) {
    this.pattern = pattern;
    this.stack = [];
  }

  setCurrentQuantifier(q: Quantifier) {
    this.currentQuantifier = q;
  }

  getLiveEntry() {
    return this.stack[this.stack.length - 1];
  }

  pause() {
    ++this.paused;
  }

  listen() {
    --this.paused;
  }

  enter(gen: Generator) {
    if (this.paused) {
      return;
    }
    // Reuse AlternativeGenerator if we have one
    // this allows us to ensure AlternativeGenerator is an umbrella rather than sequential entries
    // which is required to be able to run generate with context.
    if (this.alt && gen instanceof AlternativeGenerator) {
      this.stack.push(this.alt);
      return;
    }
    this.alt = null;

    if (this.currentQuantifier && "setQuantifier" in gen) {
      gen.setQuantifier(this.currentQuantifier);
      this.currentQuantifier = null;
    }
    this.stack.push(gen);
  }

  leave(check: (gen: Generator) => boolean) {
    if (this.paused) {
      return;
    }
    const gen = this.getLiveEntry();
    if (!check(gen)) {
      return;
    }
    const processedGen = this.stack.pop();
    if (!processedGen) {
      throw new Error("Well this is weird - No Gen on leave?");
    }
    if (processedGen instanceof AlternativeGenerator) {
      this.alt = processedGen;
    }
    const parent = this.getLiveEntry();
    if (parent) {
      if (parent instanceof ParentGenerator) {
        parent.addChild(processedGen);
      } else {
        throw new Error(`${gen.constructor.name} cannot have child node`);
      }
    } else {
      this.pattern.addChild(processedGen);
    }
  }
}

export default Gatherer;
