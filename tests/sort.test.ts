import { describe, it, expect } from "vitest";
import { sortJsonKeys } from "../src/sort";

describe("sortJsonKeys", () => {
	it("should sort keys alphabetically", () => {
		const input = { b: 2, a: 1, c: { d: 4, b: 3 } };
		const result = sortJsonKeys(input);
		expect(Object.keys(result)).toEqual(["a", "b", "c"]);
		expect(Object.keys(result.c)).toEqual(["b", "d"]);
	});

	it("should handle arrays", () => {
		const input = [{ z: 1, a: 2 }];
		const result = sortJsonKeys(input);
		expect(Object.keys(result[0])).toEqual(["a", "z"]);
	});

	it("should return primitives as is", () => {
		expect(sortJsonKeys(42)).toBe(42);
		expect(sortJsonKeys("hello")).toBe("hello");
		expect(sortJsonKeys(null)).toBe(null);
	});

	it("should sort keys with custom comparator", () => {
		const input = { b: 2, a: 1, c: 3 };
		const result = sortJsonKeys(input, {
			comparator: (a, b) => b.localeCompare(a), // descending order
		});
		expect(Object.keys(result)).toEqual(["c", "b", "a"]);
	});
});
