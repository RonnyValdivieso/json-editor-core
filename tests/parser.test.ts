import { describe, it, expect } from "vitest";
import { parseJson, validateJson } from "../src/parser";

describe("parser", () => {
	it("should parse valid JSON", () => {
		const json = '{"name": "John"}';
		expect(parseJson(json)).toEqual({ name: "John" });
	});

	it("should return null for invalid JSON", () => {
		expect(parseJson("{name: 'John'}")).toBeNull();
	});

	it("should validate correctly", () => {
		expect(validateJson('{"ok": true}')).toBe(true);
		expect(validateJson("{bad json")).toBe(false);
	});
});
