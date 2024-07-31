import type RandomNumber from "../RandomNumber";
import Unicode from "../Unicode";
import type { Flag } from "../flags";
import * as defaults from "./defaults";
import type { Settings } from "./types";

class Config {
  readonly settings: Settings = {
    quantifier: defaults.quantifier,
  };
  readonly rng: RandomNumber;
  groupValues: Record<string | number, string> = {};
  readonly unicode: Unicode;
  readonly flags: Flag[];
  constructor({
    rng,
    flags,
    settings = {},
  }: {
    rng: RandomNumber;
    flags: Flag[];
    settings?: Partial<Settings>;
  }) {
    this.rng = rng;
    this.settings = {
      ...this.settings,
      ...settings,
    };
    this.flags = flags;
    this.unicode = new Unicode({ ...this.settings.unicode, flags: this.flags });
  }
}

export default Config;
