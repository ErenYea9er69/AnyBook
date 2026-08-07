// Local storage layer for everything a signed-in reader accumulates:
// the streak grid, saved and completed books, and badges. One JSON
// blob per user, under a single key, so a read or a write never needs
// more than one localStorage call. Shaped to mirror a future Firestore
// document, so swapping the storage engine later only means rewriting
// getReadingState and setReadingState, not the functions that call them.

export type ReadingDepth = 0 | 1 | 2 | 3 | 4;

// "YYYY-MM-DD" -> depth of that day's reading. 0 or missing means no
// reading. 1 means a single quick angle. 4 means a finished book.
export type ReadingDayMap = Record<string, ReadingDepth>;

export type WeeklyGoal = 3 | 5 | 7;

export type StreakState = {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActiveDate: string | null;
  weeklyGoal: WeeklyGoal;
  freezesAvailable: number;
  freezesMonth: string; // "YYYY-MM", the month freezesAvailable last reset
};

export type BadgeId =
  | "books-1"
  | "streak-7"
  | "streak-30"
  | "books-100"
  | "genres-5";

export type UnlockedBadge = { id: BadgeId; unlockedAt: number };

export type ReadingState = {
  readingDays: ReadingDayMap;
  streak: StreakState;
  completedBookIds: string[];
  savedBookIds: string[];
  genresExplored: string[];
  badges: UnlockedBadge[];
};

export const BADGE_INFO: Record<BadgeId, { label: string; description: string }> = {
  "books-1": { label: "First finish", description: "Complete your first book." },
  "streak-7": { label: "One week strong", description: "Read seven days in a row." },
  "streak-30": { label: "One month strong", description: "Read thirty days in a row." },
  "books-100": { label: "Century club", description: "Complete one hundred books." },
  "genres-5": { label: "Wide reader", description: "Explore five different genres." },
};

const MONTHLY_FREEZE_ALLOWANCE = 3;

const BADGE_DEFS: { id: BadgeId; isEarned: (state: ReadingState) => boolean }[] = [
  { id: "books-1", isEarned: (s) => s.completedBookIds.length >= 1 },
  { id: "streak-7", isEarned: (s) => s.streak.currentStreak >= 7 },
  { id: "streak-30", isEarned: (s) => s.streak.currentStreak >= 30 },
  { id: "books-100", isEarned: (s) => s.completedBookIds.length >= 100 },
  { id: "genres-5", isEarned: (s) => s.genresExplored.length >= 5 },
];

/* ---------------------------- date helpers --------------------------- */

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayKey(): string {
  return dateKey(new Date());
}

function monthKey(dayKey: string): string {
  return dayKey.slice(0, 7);
}

function daysBetweenKeys(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

/* ------------------------------ defaults ------------------------------ */

function defaultState(): ReadingState {
  const today = todayKey();
  return {
    readingDays: {},
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      lastActiveDate: null,
      weeklyGoal: 5,
      freezesAvailable: MONTHLY_FREEZE_ALLOWANCE,
      freezesMonth: monthKey(today),
    },
    completedBookIds: [],
    savedBookIds: [],
    genresExplored: [],
    badges: [],
  };
}

/* ------------------------------- storage ------------------------------- */

function storageKey(uid: string): string {
  return `anybook:reading:${uid}`;
}

export function getReadingState(uid: string): ReadingState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(storageKey(uid));
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<ReadingState>;
    const fallback = defaultState();
    // Merge onto defaults so an older saved shape never crashes a newer read.
    return {
      ...fallback,
      ...parsed,
      streak: { ...fallback.streak, ...parsed.streak },
    };
  } catch (err) {
    console.error("Failed to read reading state", err);
    return defaultState();
  }
}

function setReadingState(uid: string, state: ReadingState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(uid), JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save reading state", err);
  }
}

export function resetReadingState(uid: string): void {
  setReadingState(uid, defaultState());
}

/* -------------------------------- reads -------------------------------- */

export function getReadingDays(uid: string): ReadingDayMap {
  return getReadingState(uid).readingDays;
}

export function getStreakState(uid: string): StreakState {
  return getReadingState(uid).streak;
}

export function getSavedBookIds(uid: string): string[] {
  return getReadingState(uid).savedBookIds;
}

export function getCompletedBookIds(uid: string): string[] {
  return getReadingState(uid).completedBookIds;
}

export function getUnlockedBadges(uid: string): UnlockedBadge[] {
  return getReadingState(uid).badges;
}

export function isBookSaved(uid: string, bookId: string): boolean {
  return getReadingState(uid).savedBookIds.includes(bookId);
}

export function isBookRead(uid: string, bookId: string): boolean {
  return getReadingState(uid).completedBookIds.includes(bookId);
}

/* -------------------------------- writes -------------------------------- */

export function toggleSavedBook(uid: string, bookId: string): string[] {
  const state = getReadingState(uid);
  const idx = state.savedBookIds.indexOf(bookId);
  if (idx === -1) state.savedBookIds.push(bookId);
  else state.savedBookIds.splice(idx, 1);
  setReadingState(uid, state);
  return state.savedBookIds;
}

export function setWeeklyGoal(uid: string, goal: WeeklyGoal): StreakState {
  const state = getReadingState(uid);
  state.streak.weeklyGoal = goal;
  setReadingState(uid, state);
  return state.streak;
}

function ensureFreezeAllowance(streak: StreakState, today: string): StreakState {
  const currentMonth = monthKey(today);
  if (streak.freezesMonth !== currentMonth) {
    return { ...streak, freezesMonth: currentMonth, freezesAvailable: MONTHLY_FREEZE_ALLOWANCE };
  }
  return streak;
}

function advanceStreak(streakIn: StreakState, today: string): StreakState {
  let streak = ensureFreezeAllowance(streakIn, today);

  if (streak.lastActiveDate === today) {
    return streak;
  }

  if (!streak.lastActiveDate) {
    streak = {
      ...streak,
      currentStreak: 1,
      lastActiveDate: today,
      totalActiveDays: streak.totalActiveDays + 1,
    };
  } else {
    const gap = daysBetweenKeys(streak.lastActiveDate, today);

    if (gap === 1) {
      streak = {
        ...streak,
        currentStreak: streak.currentStreak + 1,
        lastActiveDate: today,
        totalActiveDays: streak.totalActiveDays + 1,
      };
    } else if (gap > 1) {
      const freezesNeeded = gap - 1;
      if (streak.freezesAvailable >= freezesNeeded) {
        streak = {
          ...streak,
          currentStreak: streak.currentStreak + 1,
          freezesAvailable: streak.freezesAvailable - freezesNeeded,
          lastActiveDate: today,
          totalActiveDays: streak.totalActiveDays + 1,
        };
      } else {
        streak = {
          ...streak,
          currentStreak: 1,
          lastActiveDate: today,
          totalActiveDays: streak.totalActiveDays + 1,
        };
      }
    } else {
      // gap <= 0, guards against a clock rollback; keep the streak as is.
      streak = { ...streak, lastActiveDate: today };
    }
  }

  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  return streak;
}

function applyBadgeChecks(state: ReadingState): UnlockedBadge[] {
  const earnedIds = new Set(state.badges.map((b) => b.id));
  const newly: UnlockedBadge[] = [];
  for (const def of BADGE_DEFS) {
    if (!earnedIds.has(def.id) && def.isEarned(state)) {
      const badge: UnlockedBadge = { id: def.id, unlockedAt: Date.now() };
      state.badges.push(badge);
      newly.push(badge);
    }
  }
  return newly;
}

/**
 * The single write path for a reading action: opening an angle, finishing
 * a chapter, completing the daily challenge, or marking a whole book read.
 * Updates today's grid square, advances the streak, records the book and
 * genre where relevant, and checks for newly earned badges.
 */
export function logReadingActivity(
  uid: string,
  input: { bookId: string; genre?: string; depth?: ReadingDepth; completeBook?: boolean }
): { state: ReadingState; newlyUnlocked: UnlockedBadge[] } {
  const state = getReadingState(uid);
  const today = todayKey();

  const depth: ReadingDepth = input.depth ?? (input.completeBook ? 4 : 1);
  state.readingDays[today] = Math.max(state.readingDays[today] ?? 0, depth) as ReadingDepth;

  if (input.completeBook && !state.completedBookIds.includes(input.bookId)) {
    state.completedBookIds.push(input.bookId);
  }

  if (input.genre && !state.genresExplored.includes(input.genre)) {
    state.genresExplored.push(input.genre);
  }

  state.streak = advanceStreak(state.streak, today);

  const newlyUnlocked = applyBadgeChecks(state);

  setReadingState(uid, state);
  return { state, newlyUnlocked };
}