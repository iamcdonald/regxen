import Config, { type Settings } from "./Config";
import RandomNumber from "./RandomNumber";
import Unicode from "./Unicode";
import flags from "./flags";
import { PatternGenerator } from "./generators";
import type { Print } from "./generators/BaseGenerators";
import transform from "./transform";

class RegXen {
  private regex: RegExp;
  private pattern: PatternGenerator;
  private config: Config;
  private static options: Partial<Settings>;
  constructor(regex: RegExp, options?: Partial<Settings>) {
    this.regex = regex;
    this.pattern = new PatternGenerator();
    this.config = new Config({
      rng: new RandomNumber(),
      flags: flags.get(this.regex),
      settings: options || RegXen.options,
    });
    this.pattern.setConfig(this.config);
    transform(this.regex, this.pattern);
  }

  static setOptions(options: Partial<Settings>) {
    RegXen.options = options;
  }

  static clearUnicodeCache() {
    Unicode.clearCache();
  }

  toString() {
    return printer(this.pattern.toPrint());
  }

  setSeed(seed?: string) {
    if (seed) {
      this.config.rng.setSeed(seed);
    }
  }

  generate() {
    this.config.groupValues = {};
    return this.pattern.generate();
  }
}

const printer = (p: Print, offset = ""): string => {
  const TAB = "   ";
  const TAB_L = "|  ";
  let children = "";
  if (p.children) {
    const lastIdx = p.children.length - 1;
    children = p.children
      .map(
        (c, idx) =>
          `${offset}|__ ${printer(c, `${offset}${idx < lastIdx ? TAB_L : TAB}`)}`,
      )
      .join("");
  }
  return `${p.headline}\n${children}`;
};

export default RegXen;
