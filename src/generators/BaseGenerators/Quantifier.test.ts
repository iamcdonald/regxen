import { expect, test } from "vitest";
import Config from "../../Config";
import RandomNumber from "../../RandomNumber";
import Quantifier from "./Quantifier";

test("setConfig - sets config to be used", () => {
	const instance = new Quantifier({ min: 2, max: 6, greedy: false });

	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAA");
	expect(instance.repeat(() => "A")).toEqual("AA");

	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAA");
	expect(instance.repeat(() => "A")).toEqual("AA");
});

test("repeat - repeats passed generator based on settings taking into account greedy flag", () => {
	let instance = new Quantifier({ min: 0, max: 10, greedy: false });
	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAAA");
	expect(instance.repeat(() => "A")).toEqual("");
	expect(instance.repeat(() => "A")).toEqual("");

	instance = new Quantifier({ min: 0, max: 10, greedy: true });
	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAAAAAAAA");
	expect(instance.repeat(() => "A")).toEqual("AAAAAAA");
	expect(instance.repeat(() => "A")).toEqual("AAAAA");
});

test("repeat - repeats passed generator based on min/max", () => {
	let instance = new Quantifier({ min: 0, max: 10, greedy: true });
	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAAAAAAAA");
	expect(instance.repeat(() => "A")).toEqual("AAAAAAA");

	instance = new Quantifier({ min: 0, max: 6, greedy: true });
	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAAAA");
	expect(instance.repeat(() => "A")).toEqual("AAAA");

	instance = new Quantifier({ min: 2, max: 8, greedy: true });
	instance.setConfig(new Config(new RandomNumber("seeds")));
	expect(instance.repeat(() => "A")).toEqual("AAAAAAAA");
	expect(instance.repeat(() => "A")).toEqual("AAAAAA");
});
