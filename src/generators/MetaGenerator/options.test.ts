import { expect, test } from "vitest";
import Unicode from "../../Unicode";
import options from "./options";

const uc = new Unicode({ flags: [] });

test("any - returns all code points except line terminators", () => {
  const uc = new Unicode({ flags: ["v"] });
  const codePoints = options.get({ kind: "any" }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/(?!.)\p{Any}+/v)).toEqual(null);
  expect(chars.match(/./g)?.length).toEqual(chars.length);
});

test("any - honours passed flags", () => {
  let uc = new Unicode({ flags: ["v", "s"] });
  let chars = options.get({ kind: "any" }, uc);
  expect(chars.length).toEqual(151926);

  uc = new Unicode({ flags: ["v"] });
  chars = options.get({ kind: "any" }, uc);
  expect(chars.length).toEqual(151922);

  uc = new Unicode({ flags: ["s"] });
  chars = options.get({ kind: "any" }, uc);
  expect(chars.length).toEqual(57348);

  uc = new Unicode({ flags: [] });
  chars = options.get({ kind: "any" }, uc);
  expect(chars.length).toEqual(57344);
});

test("space - returns all space code points", () => {
  const codePoints = options.get({ kind: "space" }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\s]/)).toEqual(null);
});

test("space (negated) - returns all space code points", () => {
  const codePoints = options.get({ kind: "space", negate: true }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\S]/)).toEqual(null);
});

test("digit - returns all digit code points", () => {
  const codePoints = options.get({ kind: "digit" }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\d]/)).toEqual(null);
});

test("digit (negated) - returns all digit code points", () => {
  const codePoints = options.get({ kind: "digit", negate: true }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\D]/)).toEqual(null);
});

test("word - returns all word code points", () => {
  const codePoints = options.get({ kind: "word" }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\w]/)).toEqual(null);
});

test("word (negated) - returns all word code points", () => {
  const codePoints = options.get({ kind: "word", negate: true }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\W]/)).toEqual(null);
});

test("property:lone - returns all property code points", () => {
  const codePoints = options.get({ kind: "property", key: "Uppercase" }, uc);
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\p{Uppercase}]/v)).toEqual(null);
});

test("property:lone (negated) - returns all property code points", () => {
  const codePoints = options.get(
    { kind: "property", key: "Uppercase", negate: true },
    uc,
  );
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\P{Uppercase}]/v)).toEqual(null);
});

test("property:key & value - returns all property code points", () => {
  const codePoints = options.get(
    { kind: "property", key: "Script", value: "Hiragana" },
    uc,
  );
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\p{Script=Hiragana}]/v)).toEqual(null);
});

test("property:key & value (negated) - returns all property code points", () => {
  const codePoints = options.get(
    { kind: "property", key: "Script", value: "Hiragana", negate: true },
    uc,
  );
  const chars = codePoints.map((cp) => String.fromCodePoint(cp)).join("");
  expect(chars.match(/[^\P{Script=Hiragana}]/v)).toEqual(null);
});
