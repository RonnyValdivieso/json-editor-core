import { JsonValue } from "./types";

export interface SearchResult {
	path: string;
	value: JsonValue;
}

export interface SearchOptions {
	caseInsensitive?: boolean; // if true → ignores case sensitivity
}

/**
 * Search for all occurrences of a value or key within a JSON.
 * @param data Valid JSON (object, array, primitive)
 * @param query Text to search for (in key or value)
 * @param options Search configuration options
 * @returns List of results with path and value
 */
export function searchJson(data: JsonValue, query: string, options: SearchOptions = {}): SearchResult[] {
	const results: SearchResult[] = [];

	// Normalizar query según opciones
	const normalizedQuery = options.caseInsensitive ? query.toLowerCase() : query;

	function matches(text: string): boolean {
		return options.caseInsensitive
			? text.toLowerCase().includes(normalizedQuery)
			: text.includes(normalizedQuery);
	}

	function recurse(value: JsonValue, path: string) {
		if (value === null) return;

		if (typeof value === "object") {
			if (Array.isArray(value)) {
				value.forEach((item, i) => {
					recurse(item, `${path}[${i}]`);
				});
			} else {
				Object.entries(value).forEach(([key, val]) => {
					if (matches(key)) {
						results.push({ path: path ? `${path}.${key}` : key, value: val });
					}
					recurse(val, path ? `${path}.${key}` : key);
				});
			}
		} else {
			if (matches(String(value))) {
				results.push({ path, value });
			}
		}
	}

	recurse(data, "");
	return results;
}
