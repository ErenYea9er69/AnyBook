export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastReadDate: string | null;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
};

export function getStreakData(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalActiveDays: 0,
    lastReadDate: null,
  };
}

export function getSettings() {
  return { weeklyGoal: 3 };
}

export function getBadges(): Badge[] {
  return [
    { id: "1", name: "First Book", description: "Read your first book.", unlocked: true },
    { id: "2", name: "Streak", description: "Read for 3 days in a row.", unlocked: false },
  ];
}

export function getSavedBooks(): string[] {
  return [];
}

export function getReadingLog(): { bookId: string }[] {
  return [];
}

export function getDailyChallenge(): any {
  return null;
}

export function setDailyChallenge(challenge: any): void {}

export function hasReadChallengeToday(bookId: string, angleKey: string): boolean {
  return false;
}

export function addReadingEntry(entry: any): void {}
