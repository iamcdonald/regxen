import { expect, test } from "vitest";
import Config from "../../Config";
import RandomNumber from "../../RandomNumber";
import ChildGenerator from "./ChildGenerator";
import Quantifier from "./Quantifier";

class TestGen extends ChildGenerator {
	private str: string;
	constructor(str: string) {
		super();
		this.str = str;
	}
	generator(): string {
		return this.str.toUpperCase();
	}
}

test("generate - throws error if no config", () => {
	const instance = new TestGen("a_");
	expect(() => instance.generate()).toThrow();
});

test("setConfig - sets config to be used", () => {
	const q = new Quantifier({ min: 3, max: 7, greedy: true });
	const instance = new TestGen("a_");
	instance.setQuantifier(q);

	instance.setConfig(new Config(new RandomNumber("seed")));
	expect(instance.generate()).toEqual("A_A_A_A_A_");

	instance.setConfig(new Config(new RandomNumber("dees")));
	expect(instance.generate()).toEqual("A_A_A_A_A_A_");
});

test("setQuantifier - sets quantifier to be used", () => {
	const instance = new TestGen("a_");
	instance.setConfig(new Config(new RandomNumber("seed")));

	instance.setQuantifier(new Quantifier({ min: 3, max: 5, greedy: false }));
	expect(instance.generate()).toEqual("A_A_A_");

	instance.setQuantifier(new Quantifier({ min: 6, max: 8, greedy: true }));
	expect(instance.generate()).toEqual("A_A_A_A_A_A_A_A_");
});
