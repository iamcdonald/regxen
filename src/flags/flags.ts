import type { Flag } from "./types";

type Entries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const getFlags = (regex: RegExp): Flag[] => {
  const existingFlags: Record<Flag, boolean> = {
    g: regex.global,
    m: regex.multiline,
    s: regex.dotAll,
    u: regex.unicode,
    v: regex.unicodeSets,
    i: regex.ignoreCase,
    y: regex.sticky,
    d: regex.hasIndices,
  };
  return getEntries(existingFlags).flatMap(([key, isSet]: [Flag, boolean]) =>
    isSet ? [key] : [],
  );
};

const addFlagsToRegExp = (regex: RegExp, flags: Flag[]) => {
  const existingFlags = getFlags(regex);
  return new RegExp(
    regex.source,
    [...new Set([...existingFlags, ...flags])].join(""),
  );
};

const hasUnicode = (flags: Flag[]) =>
  (["u", "v"] as Flag[]).some((f) => flags.includes(f));

export default {
  get: getFlags,
  add: addFlagsToRegExp,
  hasUnicode,
};
