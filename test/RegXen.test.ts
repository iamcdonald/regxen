import { afterEach, expect, test, vi } from "vitest";
import RandomNumber from "../src/RandomNumber";
import RegXen from "../src/RegXen";
import { cache } from "../src/Unicode/CodePointSet";

interface IRandomNumberMock {
  reset(): void;
  setValues(value: number[]): void;
  useOriginalImplementation(on: boolean): void;
  get(): number;
  useOriginal: boolean;
}

const RandomNumberMock = RandomNumber as unknown as RandomNumber &
  IRandomNumberMock;

vi.mock("../src/RandomNumber", async (importOriginal) => {
  // mocking the RandomNumber generator so that we can define exactly what is returned in tests
  const { default: RandomNumber } =
    await importOriginal<typeof import("../src/RandomNumber")>();
  class RandomNumberMock extends RandomNumber implements RandomNumberMock {
    private static values: number[] = [0];
    private index = 0;
    static useOriginal = false;
    static setValues(values: number[]) {
      RandomNumberMock.values = values;
    }
    get(weight?: number) {
      if (RandomNumberMock.useOriginal) {
        return super.get(weight);
      }
      if (++this.index >= RandomNumberMock.values.length) {
        this.index = 0;
      }
      return RandomNumberMock.values[this.index];
    }
  }
  return {
    default: RandomNumberMock,
  };
});

afterEach(() => {
  RandomNumberMock.setValues([]);
});

test("options: quantifier - allows max char repeats to be set for unbounded quantifiers (*|+|*+|++)", () => {
  RandomNumberMock.setValues([0.99999999]);
  let rgxn = new RegXen(/a*/, { quantifier: { max: 10 } });
  expect(rgxn.generate()).toEqual("aaaaaaaaaa");
  rgxn = new RegXen(/a*/, { quantifier: { max: 5 } });
  expect(rgxn.generate()).toEqual("aaaaa");
});

test("options: unicode.filter - bound available range of unicode code points to passed sets", () => {
  RandomNumberMock.setValues([0.99999999, 0.2, 0.6]);
  let rgxn = new RegXen(/.*/, {
    quantifier: { max: 10 },
    unicode: { filter: /[A-Z]/ },
  });
  expect(rgxn.generate()).toEqual("FPZFPZFPZF");
  rgxn = new RegXen(/.*/, {
    quantifier: { max: 10 },
    unicode: { filter: /[\u{1F600}-\u{1F606}]/v },
  });
  expect(rgxn.generate()).toEqual("😁😄😆😁😄😆😁😄😆😁");
});

test("setSeed - reset's random number seed for repeatable sequences", () => {
  RandomNumberMock.useOriginal = true;
  const rgxn = new RegXen(/.*/, {
    quantifier: { max: 10 },
    unicode: { filter: /\p{Emoji}/v },
  });
  rgxn.setSeed("sseeeedd");
  expect(rgxn.generate()).toEqual("🎦🧂📜♋✨🤎✍");
  expect(rgxn.generate()).toEqual("🌈🗽🛃🪛🪺👄✏");
  expect(rgxn.generate()).toEqual("🗒🍰🌐");
  rgxn.setSeed("sseeeedd");
  expect(rgxn.generate()).toEqual("🎦🧂📜♋✨🤎✍");
  expect(rgxn.generate()).toEqual("🌈🗽🛃🪛🪺👄✏");
  expect(rgxn.generate()).toEqual("🗒🍰🌐");
});

test("generate (greedy vs lazy) - takes into account quantifier greediness", () => {
  RandomNumberMock.useOriginal = true;
  let rgxn = new RegXen(/.+/, {
    quantifier: { max: 10 },
    unicode: { filter: /\p{Emoji}/v },
  });
  rgxn.setSeed("sseeeedd");
  expect(rgxn.generate()).toEqual("🎦🧂📜♋✨🤎✍");
  expect(rgxn.generate()).toEqual("🌈🗽🛃🪛🪺👄✏");
  expect(rgxn.generate()).toEqual("🗒🍰🌐💰");
  expect(rgxn.generate()).toEqual("😣😫🆚🙃🎎⛸🪇🎛📝");
  expect(rgxn.generate()).toEqual("💈📄🔯🎞🐂🚲🗓");

  rgxn = new RegXen(/.+?/, {
    quantifier: { max: 10 },
    unicode: { filter: /\p{Emoji}/v },
  });
  rgxn.setSeed("sseeeedd");
  expect(rgxn.generate()).toEqual("🎦");
  expect(rgxn.generate()).toEqual("🛸");
  expect(rgxn.generate()).toEqual("🗽");
  expect(rgxn.generate()).toEqual("🍿🥾");
  expect(rgxn.generate()).toEqual("💰");
});

test("toString - prints view of generators", () => {
  const rgxn = new RegXen(/(?<this>[a-z]{1,2}🎦\s)*HEL{2}[öó]\k<this>/v);
  expect(rgxn.toString().trim()).toEqual(
    `
PatternGenerator -> 1 time
|__ PatternGenerator -> 1 time
   |__ AlternativeGenerator -> 1 time
      |__ AlternativeOptionGenerator -> 1 time
         |__ GroupGenerator: {"references":["this"],"capture":true} -> 0-Infinity times (greedy)
         |  |__ AlternativeGenerator -> 1 time
         |     |__ AlternativeOptionGenerator -> 1 time
         |        |__ CharacterClassGenerator: {"negated":false} -> 1-2 times (greedy)
         |        |  |__ RangeGenerator: {"start":97,"end":122}
         |        |__ LiteralGenerator: {"char":"🎦"} -> 1 time
         |        |__ MetaGenerator: {"kind":"space","negate":false} -> 1 time
         |__ LiteralGenerator: {"char":"H"} -> 1 time
         |__ LiteralGenerator: {"char":"E"} -> 1 time
         |__ LiteralGenerator: {"char":"L"} -> 2 times (greedy)
         |__ CharacterClassGenerator: {"negated":false} -> 1 time
         |  |__ LiteralGenerator: {"char":"ö"} -> 1 time
         |  |__ LiteralGenerator: {"char":"ó"} -> 1 time
         |__ GroupReferenceGenerator: {"reference":"this"} -> 1 time

`.trim(),
  );
});

test("RegXen.clearUnicodeCache - clear's the cache", () => {
  RandomNumberMock.useOriginal = true;
  RegXen.clearUnicodeCache();
  const rgxn = new RegXen(/.*/, {
    quantifier: { max: 10 },
    unicode: { filter: /\p{Emoji}/v },
  });
  rgxn.setSeed("sseeeedd");
  expect(rgxn.generate()).toEqual("🎦🧂📜♋✨🤎✍");
  expect(rgxn.generate()).toEqual("🌈🗽🛃🪛🪺👄✏");
  expect(rgxn.generate()).toEqual("🗒🍰🌐");
  expect(Object.keys(cache).length).toEqual(3);
  RegXen.clearUnicodeCache();
  expect(Object.keys(cache).length).toEqual(0);
});
