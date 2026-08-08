import type { Book } from "@/lib/books";

export type DailyChallenge = {
  bookId: string;
  bookTitle: string;
  cover: string;
  genre?: string;
  label: string;
  minutes: number;
};

type Candidate = DailyChallenge;

const QUICK_READ_MINUTES = 6;

function estimateMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// A book's category string looks like "Nonfiction · Business" or just
// "Business". The last segment is the closest thing to a genre.
function extractGenre(book: Book): string | undefined {
  const parts = book.category.split("·").map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] || undefined;
}

// A small, stable hash, so the same seed always lands on the same index.
// Good enough here since this picks a card, not a security token.
function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function collectCandidates(books: Book[]): Candidate[] {
  const out: Candidate[] = [];
  for (const book of books) {
    const genre = extractGenre(book);
    for (const group of book.angles.chapters) {
      for (const ch of group.chapters) {
        out.push({
          bookId: book.id,
          bookTitle: book.title,
          cover: book.cover,
          genre,
          label: ch.t,
          minutes: estimateMinutes(`${ch.t} ${ch.d}`),
        });
      }
    }
    // Every book has a core argument, even one with no parsed chapters,
    // so the pool is never empty.
    out.push({
      bookId: book.id,
      bookTitle: book.title,
      cover: book.cover,
      genre,
      label: "Core argument",
      minutes: estimateMinutes(book.angles.argument),
    });
  }
  return out;
}

/**
 * Picks one chapter or angle for the "Today's chapter" card. Prefers a
 * quick read (under QUICK_READ_MINUTES) from a book the reader already
 * saved and has not finished. Falls back a step at a time until the pool
 * is not empty. The pick is deterministic for a given seed, so the same
 * card shows all day rather than changing on every reload.
 */
export function pickTodaysChallenge(
  books: Book[],
  savedBookIds: string[],
  completedBookIds: string[],
  seed: string
): DailyChallenge | null {
  const all = collectCandidates(books);
  if (all.length === 0) return null;

  const quick = all.filter((c) => c.minutes <= QUICK_READ_MINUTES);
  const quickOrAll = quick.length > 0 ? quick : all;

  const savedAndUnfinished = quickOrAll.filter(
    (c) => savedBookIds.includes(c.bookId) && !completedBookIds.includes(c.bookId)
  );
  const savedAny = quickOrAll.filter((c) => savedBookIds.includes(c.bookId));

  const pool =
    savedAndUnfinished.length > 0
      ? savedAndUnfinished
      : savedAny.length > 0
      ? savedAny
      : quickOrAll;

  const index = hashString(seed) % pool.length;
  return pool[index];
}