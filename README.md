# JSON Editor Core

[![npm version](https://img.shields.io/npm/v/json-editor-core.svg?style=flat)](https://www.npmjs.com/package/json-editor-core)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library providing core JSON parsing, validation, formatting, search, and sorting functionality for JSON editors.

## Features

- **🔍 JSON Parsing**: Simple and reliable JSON parsing
- **✅ JSON Validation**: Fast JSON validation
- **🎨 JSON Formatting**: Format and minify JSON strings
- **🔎 JSON Search**: Search for keys and values within JSON data with case-insensitive options
- **📊 Key Sorting**: Sort object keys alphabetically with custom comparators
- **📘 TypeScript Support**: Full TypeScript definitions included
- **🧪 Comprehensive Testing**: Extensive test suite with high coverage
- **📦 Zero Dependencies**: No external runtime dependencies
- **🌐 Universal**: Works in Node.js and browsers

## Installation

```bash
npm install json-editor-core
```

## Quick Start

```typescript
import { parseJson, formatJson, validateJson, searchJson, sortJsonKeys } from 'json-editor-core';

// Parse JSON
const data = parseJson('{"name": "John", "age": 30}');
console.log(data); // { name: "John", age: 30 } or null if invalid

// Validate JSON
const isValid = validateJson('{"test": true}');
console.log(isValid); // true

// Format JSON
const formatted = formatJson('{"name":"John","age":30}', 4);
console.log(formatted); // Pretty printed with 4 spaces

// Search in JSON
const results = searchJson(data, "John");
console.log(results); // [{ path: "name", value: "John" }]

// Sort JSON keys
const sorted = sortJsonKeys({ c: 3, a: 1, b: 2 });
console.log(sorted); // { a: 1, b: 2, c: 3 }
```

## API Reference

### Parser Functions

#### `parseJson(input: string): JsonValue | null`

Parses a JSON string into a JavaScript object.

**Parameters:**
- `input: string` - JSON string to parse

**Returns:**
- `JsonValue | null` - Parsed JSON data or null if parsing failed

**Example:**
```typescript
const data = parseJson('{"name": "John", "age": 30}');
console.log(data); // { name: "John", age: 30 }

const invalid = parseJson('invalid json');
console.log(invalid); // null
```

#### `validateJson(input: string): boolean`

Validates a JSON string.

**Parameters:**
- `input: string` - JSON string to validate

**Returns:**
- `boolean` - True if valid, false if invalid

**Example:**
```typescript
console.log(validateJson('{"test": true}')); // true
console.log(validateJson('invalid')); // false
```

### Formatter Functions

#### `formatJson(input: string, spaces?: number): string | null`

Formats a JSON string with indentation.

**Parameters:**
- `input: string` - JSON string to format
- `spaces?: number` - Number of spaces for indentation (default: 2)

**Returns:**
- `string | null` - Formatted JSON string or null if invalid

**Example:**
```typescript
const formatted = formatJson('{"name":"John"}', 4);
console.log(formatted);
// {
//     "name": "John"
// }
```

#### `minifyJson(input: string): string | null`

Minifies a JSON string by removing all unnecessary whitespace.

**Parameters:**
- `input: string` - JSON string to minify

**Returns:**
- `string | null` - Minified JSON string or null if invalid

**Example:**
```typescript
const minified = minifyJson(`{
  "name": "John",
  "age": 30
}`);
console.log(minified); // {"name":"John","age":30}
```

### Search Functions

#### `searchJson(data: JsonValue, query: string, options?: SearchOptions): SearchResult[]`

Searches for all occurrences of a value or key within JSON data.

**Parameters:**
- `data: JsonValue` - Valid JSON data (object, array, or primitive)
- `query: string` - Text to search for (in keys or values)
- `options?: SearchOptions` - Search configuration options

**SearchOptions:**
- `caseInsensitive?: boolean` - Ignore case sensitivity (default: false)

**Returns:**
- `SearchResult[]` - Array of results with path and value

**SearchResult:**
- `path: string` - Path to the found item
- `value: JsonValue` - The found value

**Example:**
```typescript
const data = {
  user: {
    name: "John",
    hobbies: ["music", "coding"]
  }
};

// Search for a key
const results = searchJson(data, "name");
console.log(results); // [{ path: "user.name", value: "John" }]

// Search with case insensitive
const results2 = searchJson(data, "MUSIC", { caseInsensitive: true });
console.log(results2); // [{ path: "user.hobbies[0]", value: "music" }]
```

### Sorting Functions

#### `sortJsonKeys<T extends JsonValue>(data: T, options?: SortOptions): T`

Recursively sorts the keys of a JSON object.

**Parameters:**
- `data: T` - Valid JSON data (object, array, or primitive)
- `options?: SortOptions` - Configuration options

**SortOptions:**
- `comparator?: (a: string, b: string) => number` - Custom comparison function

**Returns:**
- `T` - New JSON with sorted keys

**Example:**
```typescript
const data = { c: 3, a: 1, b: { z: 26, x: 24 } };
const sorted = sortJsonKeys(data);
console.log(sorted); // { a: 1, b: { x: 24, z: 26 }, c: 3 }

// With custom comparator (reverse order)
const reversed = sortJsonKeys(data, {
  comparator: (a, b) => b.localeCompare(a)
});
console.log(reversed); // { c: 3, b: { z: 26, x: 24 }, a: 1 }
```

### Types

#### `JsonValue`
```typescript
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
```

#### `JsonObject`
```typescript
interface JsonObject { 
  [key: string]: JsonValue; 
}
```

#### `JsonArray`
```typescript
interface JsonArray extends Array<JsonValue> { }
```

## Examples

### Basic JSON Operations

```typescript
import { parseJson, formatJson, validateJson } from 'json-editor-core';

// Parse and validate
const jsonString = '{"name": "John", "age": 30}';
const data = parseJson(jsonString);

if (data !== null) {
  console.log('Valid JSON:', data);
  
  // Format with different indentation
  const formatted = formatJson(jsonString, 4);
  console.log('Formatted:', formatted);
} else {
  console.log('Invalid JSON');
}
```

### Searching JSON Data

```typescript
import { searchJson } from 'json-editor-core';

const data = {
  users: [
    { name: "John", role: "admin" },
    { name: "Jane", role: "user" }
  ],
  settings: {
    theme: "dark",
    notifications: true
  }
};

// Find all occurrences of "John"
const results = searchJson(data, "John");
console.log(results); // [{ path: "users[0].name", value: "John" }]

// Case-insensitive search
const themeResults = searchJson(data, "DARK", { caseInsensitive: true });
console.log(themeResults); // [{ path: "settings.theme", value: "dark" }]
```

### Sorting JSON Keys

```typescript
import { sortJsonKeys } from 'json-editor-core';

const unsorted = {
  zebra: "animal",
  apple: "fruit",
  banana: "fruit",
  metadata: {
    created: "2023-01-01",
    author: "John"
  }
};

// Sort alphabetically
const sorted = sortJsonKeys(unsorted);
console.log(Object.keys(sorted)); // ["apple", "banana", "metadata", "zebra"]
console.log(Object.keys(sorted.metadata)); // ["author", "created"]

// Custom sort (reverse order)
const reversed = sortJsonKeys(unsorted, {
  comparator: (a, b) => b.localeCompare(a)
});
console.log(Object.keys(reversed)); // ["zebra", "metadata", "banana", "apple"]
```

### Working with Arrays

```typescript
import { sortJsonKeys, searchJson } from 'json-editor-core';

const data = [
  { name: "Charlie", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 22 }
];

// Sort keys in each object
const sortedData = sortJsonKeys(data);
// Each object will have keys sorted: { age: ..., name: ... }

// Search in array
const results = searchJson(data, "Alice");
console.log(results); // [{ path: "[1].name", value: "Alice" }]
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
# Run tests
npm test
```

### Linting

```bash
# Check for lint errors
npm run lint
```

## TypeScript Support

This library is written in TypeScript and includes comprehensive type definitions. All functions and options are fully typed for the best development experience.

```typescript
import type { JsonValue, JsonObject, JsonArray, SearchResult, SearchOptions, SortOptions } from 'json-editor-core';
```

## Error Handling

All parsing and formatting functions return `null` when invalid JSON is provided:

```typescript
import { parseJson, formatJson, minifyJson } from 'json-editor-core';

// Invalid JSON returns null
console.log(parseJson('invalid json')); // null
console.log(formatJson('invalid json')); // null
console.log(minifyJson('invalid json')); // null

// Always check for null before using results
const data = parseJson(userInput);
if (data !== null) {
  // Safe to use data
  console.log('Parsed successfully:', data);
} else {
  console.log('Invalid JSON provided');
}
```

## Performance

- **Fast parsing**: Built on native `JSON.parse()` for optimal performance
- **Memory efficient**: No data copying in sort operations when possible
- **Search optimization**: Efficient recursive search with early termination
- **TypeScript optimized**: Zero runtime overhead for type checking

## Limitations

- **Standard JSON only**: Does not support relaxed JSON syntax (comments, trailing commas)
- **No circular reference handling**: Will throw on circular references like native JSON methods
- **String-based formatting**: Formatting functions require string input, not objects
- **Case-sensitive paths**: Search result paths are always case-sensitive

## Browser Support

- **Modern browsers**: ES2020+ support required
- **Node.js**: Version 14+ recommended
- **TypeScript**: Version 4.5+ for full type support

## Roadmap

- [ ] JSON Schema validation support
- [ ] Custom error messages with position information
- [ ] Support for relaxed JSON syntax (comments, trailing commas)
- [ ] JSONPath query support for advanced searching
- [ ] Streaming JSON parser for large files
- [ ] Custom serialization options

## License

MIT

## Funding
<a href="https://www.buymeacoffee.com/ronnjs" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="200"/>
</a>


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
