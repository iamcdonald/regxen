import type Config from "../../Config";
import type { RangeGenerator } from "../CharacterClassGenerator";
import ChildGenerator from "./ChildGenerator";
import type { Print } from "./types";

type WithInterface<T, I> = I extends void ? T : T & I;

abstract class ParentGenerator<
  T extends ChildGenerator,
  I = void,
> extends ChildGenerator {
  protected abstract validChildren: {
    // biome-ignore lint: could not see a way around this
    new (...args: any): WithInterface<T, I>;
  }[];
  protected entries: Set<T> = new Set();

  setConfig(config: Config | null) {
    this.config = config;
    this.quantifier.setConfig(config);
    for (const entry of this.entries) {
      if (entry instanceof ChildGenerator) {
        entry.setConfig(config);
      }
    }
  }

  toPrint(): Print {
    return {
      headline: this.toString(),
      children: [...this.entries].map((e) => e.toPrint()),
    };
  }

  addChild(child: ChildGenerator) {
    if (this.validChildren.some((VC) => child instanceof VC)) {
      if (child instanceof ChildGenerator) {
        child.setConfig(this.config);
      }
      this.entries.add(child as T);
    } else {
      throw new Error(
        `${this.constructor.name} cannot have a child of type ${child.constructor.name}`,
      );
    }
  }
}

export default ParentGenerator;
