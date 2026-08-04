import type { Book } from "./books";

export type AngleKey =
  | "argument"
  | "chapters"
  | "quotes"
  | "uses"
  | "pushback"
  | "authorBg";

export const ANGLE_DEFS: { key: AngleKey; label: string }[] = [
  { key: "argument", label: "Core argument" },
  { key: "chapters", label: "Chapter map" },
  { key: "quotes", label: "Notable lines" },
  { key: "uses", label: "Real world use" },
  { key: "pushback", label: "Pushback" },
  { key: "authorBg", label: "Author background" },
];

// Same strokes as the "what you get" icons up top, reused here so the
// detail page reads as the same product, not a bolted-on screen.
export const ANGLE_ICONS: Record<AngleKey, string> = {
  argument:
    '<circle cx="20" cy="20" r="15"/><circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="2.4" fill="currentColor" stroke="none"/>',
  chapters:
    '<line x1="8" y1="12" x2="32" y2="12"/><line x1="8" y1="20" x2="26" y2="20"/><line x1="8" y1="28" x2="29" y2="28"/>',
  quotes:
    '<path d="M10 14c0-3 2-5 5-5v4c-1.5 0-2 1-2 2v2h2v6h-6v-9Z"/><path d="M23 14c0-3 2-5 5-5v4c-1.5 0-2 1-2 2v2h2v6h-6v-9Z"/>',
  uses: '<path d="M8 21l7 7L33 12"/>',
  pushback:
    '<line x1="9" y1="20" x2="20" y2="20"/><polyline points="14,15 9,20 14,25"/><line x1="20" y1="20" x2="31" y2="20"/><polyline points="26,15 31,20 26,25"/>',
  authorBg:
    '<path d="M12 28L26 14a2.8 2.8 0 0 1 4 4L16 32l-6 2 2-6Z"/>',
};

export function estimateReadMinutes(book: Book): number {
  let words = 0;
  ANGLE_DEFS.forEach((def) => {
    const val = book.angles[def.key];
    if (Array.isArray(val)) {
      val.forEach((item) => {
        const text =
          typeof item === "object" ? `${item.t} ${item.d}` : String(item);
        words += text.trim().split(/\s+/).length;
      });
    } else {
      words += String(val).trim().split(/\s+/).length;
    }
  });
  return Math.max(3, Math.round(words / 200));
}
