import { expect, test } from "vitest";
import RandomNumber from "./RandomNumber";

test("constructor - can be created with seed", () => {
	expect(new RandomNumber("sesh").get()).toEqual(
		new RandomNumber("sesh").get(),
	);
});

test("setSeed - can be re-seeded", () => {
	const seed = "they";
	const rng = new RandomNumber(seed);
	const first = Array.from({ length: 5 }).map(() => rng.get());
	rng.setSeed(seed);
	const second = Array.from({ length: 5 }).map(() => rng.get());
	expect(second).toEqual(first);
});

test("get (no weight) - retrives random number", () => {
	const seed = "theyg";
	const rng = new RandomNumber(seed);
	expect(rng.get()).toEqual(0.7200348367914557);
});

test("get (weight = 0.5) - retrives random number without weighting", () => {
	const seed = "theyg";
	const rng = new RandomNumber(seed);
	expect(rng.get(0.5)).toEqual(0.7200348367914557);
});

test("get (weight = 0.2) - retrives random number weighted towards 0", () => {
	const seed = "theyg";
	const rng = new RandomNumber(seed);
	expect(rng.get(0.2)).toEqual(0.26879057482585866);
});

test("get (weight = 0.9) - retrives random number weighted towards 1", () => {
	const seed = "theyg";
	const rng = new RandomNumber(seed);
	expect(rng.get(0.9)).toEqual(0.9641628414535398);
});
