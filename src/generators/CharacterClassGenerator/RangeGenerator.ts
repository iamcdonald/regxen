import type { IPrintable } from "../BaseGenerators";
import type { ICharacterClassChild } from "./CharacterClassGenerator";

class RangeGenerator implements ICharacterClassChild, IPrintable {
  private range: { start: number; end: number };
  constructor({ start, end }: { start: number; end: number }) {
    this.range = { start, end };
  }

  toString() {
    return `${this.constructor.name}: ${JSON.stringify(this.range)}`;
  }

  toPrint() {
    return {
      headline: this.toString(),
    };
  }

  getCodePoints() {
    return Array.from({ length: this.range.end + 1 - this.range.start }).map(
      (_, idx) => this.range.start + idx,
    );
  }
}

export default RangeGenerator;
