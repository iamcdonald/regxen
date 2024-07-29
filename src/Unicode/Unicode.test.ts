import { afterEach, expect, test } from "vitest";
import CodePointSet from "./CodePointSet";
import Unicode from "./Unicode";

afterEach(() => {
	CodePointSet.clearCache();
});

test("options: filter (exclude) - choose which sets to include in available options", () => {
	const u = new Unicode({ filter: /\P{Uppercase}/gv });
	const availableCodePoints = u.getCodePointsForRegex(/\p{Any}/gv);

	const cps = new CodePointSet({ key: "x", codePoints: availableCodePoints });
	expect(cps.select(/\p{Uppercase}/v).length).toEqual(0);
	expect(cps.select(/\P{Uppercase}/v).length).toEqual(
		availableCodePoints.length,
	);
});

test("options: filter (include) - choose which sets to include in available options", () => {
	const u = new Unicode({ filter: /\p{Uppercase}/v });
	const availableCodePoints = u.getCodePointsForRegex(/\p{Any}/gv);

	const cps = new CodePointSet({ key: "x", codePoints: availableCodePoints });
	expect(cps.select(/\P{Uppercase}/v).length).toEqual(0);
	expect(cps.select(/\p{Uppercase}/v).length).toEqual(
		availableCodePoints.length,
	);
});
