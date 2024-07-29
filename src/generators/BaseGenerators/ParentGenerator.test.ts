import { expect, test } from "vitest";
import Config from "../../Config";
import RandomNumber from "../../RandomNumber";
import ChildGenerator from "./ChildGenerator";
import ParentGenerator from "./ParentGenerator";
import Quantifier from "./Quantifier";

test("addChild - only allows valid children", () => {
	class ValidAnonChild extends ChildGenerator {
		generator() {
			return "";
		}
	}
	class NonValidAnonChild extends ChildGenerator {
		generator() {
			return "";
		}
	}
	class AnonParent extends ParentGenerator<ValidAnonChild> {
		validChildren = [ValidAnonChild];
		generator() {
			return "";
		}
	}

	const instance = new AnonParent();
	expect(() => instance.addChild(new ValidAnonChild())).not.toThrow();
	expect(() => instance.addChild(new NonValidAnonChild())).toThrow();
});

test("addChild - sets config", () => {
	class ValidAnonChild extends ChildGenerator {
		private char: string;
		constructor(char: string) {
			super();
			this.char = char;
		}
		generator() {
			return this.char;
		}
	}
	class AnonParent extends ParentGenerator<ValidAnonChild> {
		validChildren = [ValidAnonChild];
		generator() {
			return [...this.entries].map((e) => e.generate()).join("");
		}
	}

	const instance = new AnonParent();
	instance.setConfig(new Config(new RandomNumber("||||")));

	const children = [new ValidAnonChild("a"), new ValidAnonChild("b")];
	children.forEach((c, idx) => {
		c.setQuantifier(
			new Quantifier({ min: 1, max: (idx + 1) * 6, greedy: false }),
		);
		instance.addChild(c);
	});
	// Would fail if config hadn't been successfully set'
	expect(instance.generate()).toEqual("aabbbbbbb");
	expect(instance.generate()).toEqual("aaaaaab");
});

test("setConfig - propagates across children", () => {
	class ValidAnonChild extends ChildGenerator {
		private char: string;
		constructor(char: string) {
			super();
			this.char = char;
		}
		generator() {
			return this.char;
		}
	}
	class AnonParent extends ParentGenerator<ValidAnonChild> {
		validChildren = [ValidAnonChild];
		generator() {
			return [...this.entries].map((e) => e.generate()).join("");
		}
	}

	const instance = new AnonParent();
	instance.setConfig(new Config(new RandomNumber("||||")));

	const children = [new ValidAnonChild("a"), new ValidAnonChild("b")];
	children.forEach((c, idx) => {
		c.setQuantifier(
			new Quantifier({ min: 1, max: (idx + 1) * 6, greedy: false }),
		);
		instance.addChild(c);
	});
	// Would fail if config hadn't been successfully set'
	expect(instance.generate()).toEqual("aabbbbbbb");

	instance.setConfig(new Config(new RandomNumber("r_n_g")));
	// We get a different value that we recieve on the second time in the previous test
	// This is because the random number generation has been seeded with a different value
	expect(instance.generate()).toEqual("abbbbbbbb");
});
