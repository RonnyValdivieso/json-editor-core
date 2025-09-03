import { describe, it, expect } from "vitest";
import { searchJson } from "../src/search";

describe("searchJson", () => {
	const data = {
		user: {
			name: "John",
			age: 25,
			hobbies: ["music", "coding"]
		}
	};

	it("should find a key (case-sensitive)", () => {
		const result = searchJson(data, "name");
		expect(result).toEqual([{ path: "user.name", value: "John" }]);
	});

	it("should not match different case when caseInsensitive is false", () => {
		const result = searchJson(data, "Name");
		expect(result).toEqual([]); // no match
	});

	it("should match case-insensitive when enabled", () => {
		const result = searchJson(data, "Name", { caseInsensitive: true });
		expect(result).toEqual([{ path: "user.name", value: "John" }]);
	});

	it("should find a value inside array", () => {
		const result = searchJson(data, "coding");
		expect(result).toEqual([{ path: "user.hobbies[1]", value: "coding" }]);
	});

	it("should return empty array if not found", () => {
		const result = searchJson(data, "missing");
		expect(result).toEqual([]);
	});
});
