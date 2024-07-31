import type { Flag } from "../flags";
import flags from "../flags";
import CodePointSet from "./CodePointSet";
import type { UnicodeOptions } from "./types";

class Unicode {
  private codePointSet: CodePointSet<string>;
  private flags: Flag[];
  constructor(options: UnicodeOptions) {
    this.flags = options.flags || [];
    this.codePointSet = new CodePointSet({
      reduced: !flags.hasUnicode(this.flags),
    }).createSubSet(/[\p{Assigned}--\p{Co}]/v);
    if (options.filter) {
      this.codePointSet = this.codePointSet.createSubSet(options.filter);
    }
    if (!this.codePointSet.select().length) {
      throw new Error("No code points available for generators to select from");
    }
  }

  static clearCache() {
    CodePointSet.clearCache();
  }

  getCodePointsForRegex(regex: RegExp) {
    return this.codePointSet.select(flags.add(regex, this.flags));
  }

  negateCodePointSet(set: number[]) {
    return this.codePointSet.select().filter((c: number) => !set.includes(c));
  }
}

export default Unicode;
