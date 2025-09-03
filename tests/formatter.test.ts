import { describe, it, expect } from "vitest";
import { formatJson, minifyJson } from "../src/formatter";

describe("formatter", () => {
	const json = '{"name": "John", "active": true}';

	it("should format JSON with default spaces", () => {
		const formatted = formatJson(json);
		expect(formatted).toBe(
			JSON.stringify(JSON.parse(json), null, 2)
		);
	});

	it("should format JSON with custom spaces", () => {
		const formatted = formatJson(json, 4);
		expect(formatted).toBe(
			JSON.stringify(JSON.parse(json), null, 4)
		);
	});

	it("should return null for invalid JSON in formatJson", () => {
		expect(formatJson("{invalid json")).toBeNull();
	});

	it("should minify JSON", () => {
		const minified = minifyJson(json);
		expect(minified).toBe(JSON.stringify(JSON.parse(json)));
	});

	it("should return null for invalid JSON in minifyJson", () => {
		expect(minifyJson("{oops")).toBeNull();
	});
});
