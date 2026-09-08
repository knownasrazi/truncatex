import { describe, expect, it } from "bun:test";
import { truncate, truncateWords } from "../src";

describe("truncate", () => {
  it("returns the string untouched when shorter than length", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long strings with ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("accepts a numeric shortcut for length", () => {
    expect(truncate("hello world", 5)).toBe("he...");
  });

  it("respects word boundary breaking", () => {
    const out = truncate("hello world foo bar", { length: 12, wordBoundary: true });
    expect(out).toBe("hello...");
  });

  it("falls back to hard cut when word boundary leaves nothing", () => {
    const out = truncate("supercalifragilistic", { length: 10, wordBoundary: true });
    expect(out).toBe("superca...");
  });

  it("throws when length is negative", () => {
    expect(() => truncate("x", -1)).toThrow(RangeError);
  });

  it("throws when ellipsis is longer than length", () => {
    expect(() => truncate("x", { length: 2, ellipsis: "..." })).toThrow(RangeError);
  });

  it("supports a custom ellipsis", () => {
    expect(truncate("hello world", { length: 10, ellipsis: "…" })).toBe("hello wor…");
  });
});

describe("truncateWords", () => {
  it("returns the string when within the word limit", () => {
    expect(truncateWords("one two three", 5)).toBe("one two three");
  });

  it("truncates to the requested number of words", () => {
    expect(truncateWords("one two three four", 2)).toBe("one two");
  });

  it("returns empty string for zero-word limit", () => {
    expect(truncateWords("one two", 0)).toBe("");
  });
});
