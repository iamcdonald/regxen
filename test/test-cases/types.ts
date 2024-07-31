import type { Settings } from "../../src/Config";

export type TestCase = {
  regex: RegExp;
  description: string;
  options?: Partial<Settings>;
  checkOutput?: RegExp;
};
