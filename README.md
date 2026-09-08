<div align="center">

# truncatex

**Intelligent text truncation, word-aware.**

![npm version](https://img.shields.io/npm/v/@knownasrazi/truncatex?style=flat-square&logo=npm&label=npm&color=6366f1)
![npm downloads](https://img.shields.io/npm/dm/@knownasrazi/truncatex?style=flat-square&logo=npm&label=downloads&color=8b5cf6)
![bundle size](https://img.shields.io/bundlephobia/minzip/@knownasrazi/truncatex?style=flat-square&label=minzip&color=f472b6)
![license](https://img.shields.io/github/license/knownasrazi/truncatex?style=flat-square&color=22d3ee)
[![CI](https://img.shields.io/github/actions/workflow/status/knownasrazi/truncatex/ci.yml?style=flat-square&label=CI)](https://github.com/knownasrazi/truncatex/actions)

Zero dependencies - ~2 KB gzipped - TypeScript - Node + Bun + browser

</div>

---

## Why truncatex?

Cuts text cleanly — no mid-word carnage, no off-by-one ellipsis bugs.

```
"hello world example" -> truncate("...", 11) -> "hello..."
"hello world example" -> truncate("...", { length: 14, wordBoundary: true }) -> "hello..."
```

## Install

```bash
bun add @knownasrazi/truncatex    # or
npm install @knownasrazi/truncatex
```

## Usage

```ts
import { truncate, truncateWords } from "@knownasrazi/truncatex";

truncate("hello world", 8); // "hello..."
truncate("hello world foo bar", { length: 12, wordBoundary: true }); // "hello..."
truncateWords("one two three four", 2); // "one two"
```

## API

### `truncate(input: string, options?: TruncateOptions | number): string`

| Option       | Type      | Default | Description                               |
| ------------ | --------- | ------- | ----------------------------------------- |
| `length`     | `number`  | `30`    | Max output length including ellipsis       |
| `ellipsis`   | `string`  | `"..."` | Suffix appended when truncating           |
| `wordBoundary` | `boolean` | `false` | Break on word boundaries                  |

- Throws `RangeError` when `length < 0` or `ellipsis.length > length`.
- Shorthand `truncate(str, 12)` equals `{ length: 12 }`.

### `truncateWords(input: string, wordLimit: number): string`

Truncates to `wordLimit` words; `0` yields the empty string.

## Development

```bash
git clone https://github.com/knownasrazi/truncatex.git
cd truncatex
bun install
bun test          # run tests
bun run build     # tsup -> dist/
bun run lint      # biome check
```

## License

[MIT](./LICENSE) + [Razi](https://github.com/knownasrazi)

---

<div align="center">

**truncatex** - truncate without the ugliness.

</div>
