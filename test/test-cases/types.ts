import type { Flag } from "../../src/flags";

export type RegExpParts = {
  source: string;
  flags?: Flag[];
};

export type TestCase = {
  regex: RegExpParts;
  description: string;
  options?: {
    unicode: {
      filter: RegExpParts;
    };
  };
  checkOutput?: RegExpParts;
};
