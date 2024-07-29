import AlternativeGenerator from "./AlternativeGenerator";
import { ParentGenerator } from "./BaseGenerators";
import CharacterClassGenerator from "./CharacterClassGenerator";
import GroupReferenceGenerator from "./GroupReferenceGenerator";
import LiteralGenerator from "./LiteralGenerator";

class GroupGenerator extends ParentGenerator<
  | GroupGenerator
  | AlternativeGenerator
  | GroupReferenceGenerator
  | LiteralGenerator
  | CharacterClassGenerator
> {
  protected validChildren = [
    GroupGenerator,
    AlternativeGenerator,
    GroupReferenceGenerator,
    LiteralGenerator,
    CharacterClassGenerator,
  ];
  private capture: boolean;
  private references?: (string | number)[];
  constructor({
    references,
    capture,
  }: {
    references?: (string | number)[];
    capture?: boolean;
  } = {}) {
    super();
    this.references = references;
    this.capture = !!capture;
  }

  toString() {
    return super.toString({
      references: this.references,
      capture: this.capture,
    });
  }

  generator() {
    const value = [...this.entries].map((e) => e.generate()).join("");
    if (this.capture) {
      for (const ref of this.references || []) {
        this.getConfig().groupValues = {
          ...this.getConfig().groupValues,
          [ref]: value,
        };
      }
    }
    return value;
  }
}

export default GroupGenerator;
