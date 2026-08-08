// One short note per reader per book. Same local-storage pattern as
// reading-storage.ts: one JSON blob per user, this time keyed further by
// book id inside that blob. The isPublic flag is stored and ready to use,
// but nothing reads another user's notes yet, since that needs a real
// backend, not a browser's own storage.

export type BookReview = {
  bookId: string;
  text: string;
  isPublic: boolean;
  updatedAt: number;
};

type ReviewMap = Record<string, BookReview>;

function storageKey(uid: string): string {
  return `anybook:reviews:${uid}`;
}

function getAllReviews(uid: string): ReviewMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey(uid));
    return raw ? (JSON.parse(raw) as ReviewMap) : {};
  } catch (err) {
    console.error("Failed to read reviews", err);
    return {};
  }
}

function setAllReviews(uid: string, reviews: ReviewMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(uid), JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to save reviews", err);
  }
}

export function getReview(uid: string, bookId: string): BookReview | null {
  return getAllReviews(uid)[bookId] ?? null;
}

export function saveReview(
  uid: string,
  bookId: string,
  text: string,
  isPublic: boolean
): BookReview {
  const reviews = getAllReviews(uid);
  const review: BookReview = { bookId, text, isPublic, updatedAt: Date.now() };
  reviews[bookId] = review;
  setAllReviews(uid, reviews);
  return review;
}

export function deleteReview(uid: string, bookId: string): void {
  const reviews = getAllReviews(uid);
  delete reviews[bookId];
  setAllReviews(uid, reviews);
}