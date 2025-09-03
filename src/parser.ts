import { JsonValue } from "./types";

/**
 * Parse a JSON string into a JavaScript object.
 * @param input JSON string to parse
 * @returns Parsed JSON object or null if invalid
 */
export function parseJson(input: string): JsonValue | null {
	try {
		return JSON.parse(input);
	} catch {
		return null;
	}
}

/**
 * Validate a JSON string.
 * @param input JSON string to validate
 * @returns True if valid, false if invalid
 */
export function validateJson(input: string): boolean {
	try {
		JSON.parse(input);
		return true;
	} catch {
		return false;
	}
}
