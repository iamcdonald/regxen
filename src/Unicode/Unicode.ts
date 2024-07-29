import CodePointSet from "./CodePointSet";
import type { UnicodeOptions } from "./types";

class Unicode {
  private codePointSet: CodePointSet<string>;
  constructor(options?: UnicodeOptions) {
    this.codePointSet = new CodePointSet().createSubSet(
      /[\p{Assigned}--\p{Co}]/gv,
    );
    if (options?.filter) {
      this.codePointSet = this.codePointSet.createSubSet(options.filter);
    }
  }

  static clearCache() {
    CodePointSet.clearCache();
  }

  getCodePointsForRegex(regex: RegExp) {
    return this.codePointSet.select(regex);
  }

  negateCodePointSet(set: number[]) {
    return this.codePointSet.select().filter((c: number) => !set.includes(c));
  }
}

export default Unicode;
