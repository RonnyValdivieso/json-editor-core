/**
 * Format a JSON string with indentation.
 * @param input JSON string to format
 * @param spaces Number of spaces for indentation
 * @returns Formatted JSON string or null if invalid
 */
export function formatJson(input: string, spaces: number = 2): string | null {
	try {
		const parsed = JSON.parse(input);
		return JSON.stringify(parsed, null, spaces);
	} catch {
		return null;
	}
}

/**
 * Minify a JSON string.
 * @param input JSON string to minify
 * @returns Minified JSON string or null if invalid
 */
export function minifyJson(input: string): string | null {
	try {
		const parsed = JSON.parse(input);
		return JSON.stringify(parsed);
	} catch {
		return null;
	}
}
