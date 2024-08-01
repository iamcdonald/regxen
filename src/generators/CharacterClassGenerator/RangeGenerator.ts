import { ChildGenerator, type IPrintable } from "../BaseGenerators";
import type { ICharacterClassChild } from "./CharacterClassGenerator";

class RangeGenerator
  extends ChildGenerator
  implements ICharacterClassChild, IPrintable
{
  private range: { start: number; end: number };
  constructor({ start, end }: { start: number; end: number }) {
    super();
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
    const { start, end } = this.range;
    return this.getConfig().unicode.getCodePointsForRegex(
      new RegExp(
        `[${String.fromCodePoint(start)}-${String.fromCodePoint(end)}]`,
      ),
    );
  }

  generator() {
    return "";
  }
}

export default RangeGenerator;
