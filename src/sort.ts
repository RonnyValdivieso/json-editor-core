import { JsonValue, JsonObject } from "./types";

export interface SortOptions {
	comparator?: (_a: string, _b: string) => number; // optional comparator function
}

/**
 * Recursively sorts the keys of a JSON object.
 * @param data Valid JSON (object, array, primitive)
 * @param options Configuration options (e.g. comparator)
 * @returns New JSON with sorted keys
 */
export function sortJsonKeys<T extends JsonValue>(
	data: T,
	options: SortOptions = {}
): T {
	if (data === null) return data;

	if (Array.isArray(data)) {
		return data.map((item) => sortJsonKeys(item, options)) as T;
	}

	if (typeof data === "object") {
		const obj = data as JsonObject;
		const keys = Object.keys(obj).sort(options.comparator);

		const sorted: JsonObject = {};
		keys.forEach((key) => {
			sorted[key] = sortJsonKeys(obj[key], options);
		});

		return sorted as T;
	}

	return data;
}
