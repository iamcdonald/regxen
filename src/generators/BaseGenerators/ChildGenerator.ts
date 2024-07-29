import type Config from "../../Config";
import Quantifier from "./Quantifier";
import type { IPrintable, JSONObject, Print } from "./types";

abstract class ChildGenerator implements IPrintable {
  protected config: Config | null = null;
  quantifier: Quantifier;
  constructor() {
    this.quantifier = new Quantifier({ min: 1, max: 1, greedy: false });
    this.generator = this.generator.bind(this);
  }

  protected abstract generator(): string;

  toString(additional?: JSONObject) {
    return `${this.constructor.name}${additional ? `: ${JSON.stringify(additional)}` : ""} -> ${this.quantifier.toString()}`;
  }

  toPrint(): Print {
    return {
      headline: this.toString(),
    };
  }

  setConfig(config: Config | null) {
    this.config = config;
    this.quantifier.setConfig(config);
  }

  getConfig() {
    if (!this.config) {
      throw new Error("Config not set");
    }
    return this.config;
  }

  setQuantifier(quantifier: Quantifier) {
    quantifier.setConfig(this.config);
    this.quantifier = quantifier;
  }

  generate() {
    return this.quantifier.repeat(() => this.generator());
  }
}

export default ChildGenerator;
