import { afterEach, expect, test } from "vitest";
import CodePointSet from "./CodePointSet";
import Unicode from "./Unicode";

afterEach(() => {
  CodePointSet.clearCache();
});

test("options: filter (exclude) - choose which sets to include in available options", () => {
  const u = new Unicode({ filter: /\P{Uppercase}/gv, flags: [] });
  const availableCodePoints = u.getCodePointsForRegex(/\p{Any}/gv);

  const cps = new CodePointSet({ key: "x", codePoints: availableCodePoints });
  expect(cps.select(/\p{Uppercase}/v).length).toEqual(0);
  expect(cps.select(/\P{Uppercase}/v).length).toEqual(
    availableCodePoints.length,
  );
});

test("options: filter (include) - choose which sets to include in available options", () => {
  const u = new Unicode({ filter: /\p{Uppercase}/v, flags: [] });
  const availableCodePoints = u.getCodePointsForRegex(/\p{Any}/gv);

  const cps = new CodePointSet({ key: "x", codePoints: availableCodePoints });
  expect(cps.select(/\P{Uppercase}/v).length).toEqual(0);
  expect(cps.select(/\p{Uppercase}/v).length).toEqual(
    availableCodePoints.length,
  );
});

test("options: flags - set flags that should be included on every select", () => {
  let u = new Unicode({ flags: [] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(57344);

  u = new Unicode({ flags: ["s"] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(57348);

  u = new Unicode({ flags: ["v"] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(151922);

  u = new Unicode({ flags: ["u"] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(151922);

  u = new Unicode({ flags: ["v", "s"] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(151926);

  u = new Unicode({ flags: ["u", "s"] });
  expect(u.getCodePointsForRegex(/./).length).toEqual(151926);
});
