import type Unicode from "../../Unicode";
import type { Meta } from "./types";

const getOptions = (meta: Meta, unicode: Unicode): number[] => {
  switch (meta.kind) {
    case "property": {
      // Property use is only available with either "u" or "v" flag
      // Unicode method will ensure correct flags are added based on original RegExp
      const regexStr = `${meta.key}${meta.value ? `=${meta.value}` : ""}`;
      if (meta.negate) {
        return unicode.getCodePointsForRegex(new RegExp(`\\P{${regexStr}}`));
      }
      return unicode.getCodePointsForRegex(new RegExp(`\\p{${regexStr}}`));
    }
    case "any":
      return unicode.getCodePointsForRegex(/./);
    case "digit":
      if (meta.negate) {
        return unicode.getCodePointsForRegex(/\D/);
      }
      return unicode.getCodePointsForRegex(/\d/);
    case "space":
      if (meta.negate) {
        return unicode.getCodePointsForRegex(/\S/);
      }
      return unicode.getCodePointsForRegex(/\s/);
    case "word":
      if (meta.negate) {
        return unicode.getCodePointsForRegex(/\W/);
      }
      return unicode.getCodePointsForRegex(/\w/);
  }
  return [];
};

export default {
  get: getOptions,
};
