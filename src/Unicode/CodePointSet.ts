import addFlagsToRegExp from "./add-flags-to-regexp";

const UNICODE_RANGE_MAX = 1114111;
const CODE_POINT_STRING_SEPERATOR = " ";
const CODE_POINT_STRING_SEPERATOR_CP = CODE_POINT_STRING_SEPERATOR.codePointAt(
  0,
) as number;

const allCodePointSet = Array.from({
  length: UNICODE_RANGE_MAX,
}).map((_, idx) => idx);

const setRegExpGlobal = (regex: RegExp) => addFlagsToRegExp(regex, ["g"]);

export let cache: Record<string, number[]> = {};

type ReservedBaseCacheName = "all";

class CodePointSet<T extends string> {
  private codePoints: number[];
  private codePointsStr: string;
  private stripSeperatorFromResults: boolean;
  private key: string;
  constructor(opts?: {
    codePoints?: number[];
    key?: T extends ReservedBaseCacheName ? never : T;
  }) {
    this.key = opts?.key || "all";
    this.codePoints = opts?.codePoints || allCodePointSet;
    this.codePointsStr = this.codePoints
      .map((cp) => String.fromCodePoint(cp))
      .join(CODE_POINT_STRING_SEPERATOR);
    this.stripSeperatorFromResults = !this.codePoints.includes(
      CODE_POINT_STRING_SEPERATOR_CP,
    );
  }

  static clearCache() {
    cache = {};
  }

  private getCacheKey(regex: RegExp) {
    return `${this.key}->${regex.toString()}`;
  }

  select(regex?: RegExp): number[] {
    if (!regex) {
      return this.codePoints;
    }
    const regexg = setRegExpGlobal(regex);
    const cacheKey = this.getCacheKey(regexg);
    if (cacheKey in cache) {
      return cache[cacheKey];
    }
    const codePoints = [
      ...new Set(this.codePointsStr.match(regexg) || []),
    ].flatMap((char) => {
      if (
        this.stripSeperatorFromResults &&
        char === CODE_POINT_STRING_SEPERATOR
      ) {
        return [];
      }
      return [char.codePointAt(0) as number];
    });
    cache[cacheKey] = codePoints;
    return codePoints;
  }

  createSubSet(regex: RegExp) {
    const regexg = setRegExpGlobal(regex);
    return new CodePointSet({
      key: this.getCacheKey(regexg),
      codePoints: this.select(regexg),
    });
  }
}

export default CodePointSet;
