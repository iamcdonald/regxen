import { afterEach, expect, test } from "vitest";
import CodePointSet, { cache } from "./CodePointSet";

afterEach(() => {
	CodePointSet.clearCache();
});
test("constructor: with no args - allows access to full set of code points", () => {
	const cps = new CodePointSet();
	expect(cps.select().length).toEqual(1114111);
});

test("constructor: with key - uses key to index into cache", () => {
	const cps = new CodePointSet({ key: "things" });
	expect(cps.select(/A/).length).toEqual(1);
	expect(cache["things->/A/g"]).toEqual(["A".codePointAt(0)]);
});

test("constructor: with code point array - uses code point array as initial set", () => {
	const cps = new CodePointSet({
		key: "things",
		codePoints: [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/],
	});
	expect(cps.select(/A/).length).toEqual(0);
});

test("select: with no regex - returns current set", () => {
	const set = [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/];
	const cps = new CodePointSet({ key: "things", codePoints: set });
	expect(cps.select()).toEqual(set);
});

test("select: with regex - returns sub set macthing regex set & sets cache", () => {
	const set = [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/];
	const cps = new CodePointSet({ key: "things", codePoints: set });
	expect(cps.select(/[BC]/)).toEqual([66, 67]);
	expect(cache["things->/[BC]/g"]).toEqual([66, 67]);
});

test("createSubSet - returns new CodePointSet withsub set macthing regex set & sets cache", () => {
	const set = [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/];
	const cps = new CodePointSet({ key: "things", codePoints: set });
	const subset = cps.createSubSet(/[BC]/);
	expect(cache["things->/[BC]/g"]).toEqual([66, 67]);
	expect(subset.select(/[D]/)).toEqual([]);
	expect(cache["things->/[BC]/g->/[D]/g"]).toEqual([]);
	expect(subset.select(/[C]/)).toEqual([67]);
	expect(cache["things->/[BC]/g->/[C]/g"]).toEqual([67]);
});

test("cache - all selects are cached", () => {
	const set = [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/];
	const cps = new CodePointSet({ key: "things", codePoints: set });
	const subset = cps.createSubSet(/[BC]/);
	expect(cache["things->/[BC]/g"]).toEqual([66, 67]);
	expect(subset.select(/[D]/)).toEqual([]);
	expect(cache["things->/[BC]/g->/[D]/g"]).toEqual([]);
	expect(subset.select(/[C]/)).toEqual([67]);
	expect(cache["things->/[BC]/g->/[C]/g"]).toEqual([67]);
});

test("clearCache - clears all cached entries", () => {
	const set = [66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/];
	const cps = new CodePointSet({ key: "things", codePoints: set });
	const subset = cps.createSubSet(/[BC]/);
	expect(cache["things->/[BC]/g"]).toEqual([66, 67]);
	expect(subset.select(/[D]/)).toEqual([]);
	expect(cache["things->/[BC]/g->/[D]/g"]).toEqual([]);
	expect(subset.select(/[C]/)).toEqual([67]);
	expect(cache["things->/[BC]/g->/[C]/g"]).toEqual([67]);
	CodePointSet.clearCache();
	expect(cache).toEqual({});
});
