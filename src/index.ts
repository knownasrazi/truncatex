/**
 * truncatex — intelligent text truncation.
 * Zero dependencies. Works in Node, Bun and the browser (bundlers).
 */

export interface TruncateOptions {
  /** Maximum length of the result, including the ellipsis string. */
  length?: number;
  /** String appended when truncation occurs. Defaults to `"..."`. */
  ellipsis?: string;
  /** Break on word boundaries instead of mid-word. */
  wordBoundary?: boolean;
}

const DEFAULT_LENGTH = 30;
const DEFAULT_ELLIPSIS = "...";

export function truncate(input: string, options: TruncateOptions | number = {}): string {
  let opts: TruncateOptions;
  if (typeof options === "number") {
    opts = { length: options };
  } else {
    opts = options;
  }

  const length = opts.length ?? DEFAULT_LENGTH;
  const ellipsis = opts.ellipsis ?? DEFAULT_ELLIPSIS;

  if (length < 0) throw new RangeError("truncatex#truncate length must be >= 0");
  if (ellipsis.length > length) {
    throw new RangeError("truncatex#truncate length must be >= ellipsis length");
  }

  if (input.length <= length) return input;

  const keep = length - ellipsis.length;
  if (opts.wordBoundary) {
    let cut = input.slice(0, keep);
    // Drop a trailing partial word.
    const lastSpace = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf("\n"), cut.lastIndexOf("\t"));
    if (lastSpace > 0) {
      cut = cut.slice(0, lastSpace);
    }
    // If we trimmed everything, fall back to a hard cut so we still return something.
    if (cut.length === 0) {
      cut = input.slice(0, keep);
    }
    return cut + ellipsis;
  }

  return input.slice(0, keep) + ellipsis;
}

export function truncateWords(input: string, wordLimit: number): string {
  if (wordLimit < 0) throw new RangeError("truncatex#truncateWords wordLimit must be >= 0");
  const words = input.split(/\s+/);
  if (words.length <= wordLimit) return input;
  return words.slice(0, wordLimit).join(" ");
}
