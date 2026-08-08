"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDashboard } from "@/lib/dashboard-context";
import { fetchAllBooks, type Book } from "@/lib/books";
import {
  getCompletedBookIds,
  getReadingDays,
  getSavedBookIds,
  logReadingActivity,
  todayKey,
} from "@/lib/reading-storage";
import { pickTodaysChallenge, type DailyChallenge } from "@/lib/daily-challenge";

// The one-task homepage card from the spec: one chapter, one line, one
// button. Picks a quick read from a saved, unfinished book where
// possible, and clicking it logs today's square and jumps straight into
// that book in the Library tab, no search step in between.
export default function TodayPanel() {
  const { user } = useAuth();
  const { setActiveTab } = useDashboard();
  const [books, setBooks] = useState<Book[]>([]);
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [completedToday, setCompletedToday] = useState(false);

  const rawName = user?.displayName || user?.email?.split("@")[0] || "reader";
  const firstName = rawName.split(" ")[0];

  useEffect(() => {
    fetchAllBooks().then(setBooks).catch(console.error);
  }, []);

  useEffect(() => {
    if (!user || books.length === 0) return;
    const saved = getSavedBookIds(user.uid);
    const completed = getCompletedBookIds(user.uid);
    setChallenge(pickTodaysChallenge(books, saved, completed, `${user.uid}:${todayKey()}`));
    setCompletedToday(!!getReadingDays(user.uid)[todayKey()]);
  }, [user, books]);

  function handleReadNow() {
    if (!user || !challenge) return;

    logReadingActivity(user.uid, {
      bookId: challenge.bookId,
      genre: challenge.genre,
      depth: 1,
    });
    setCompletedToday(true);

    // Set the book first, without a new history entry, then switch tabs
    // (setActiveTab pushes its own entry and keeps the book param intact,
    // since it builds from the URL as it stands right now).
    const params = new URLSearchParams(window.location.search);
    params.set("book", challenge.bookId);
    window.history.replaceState({}, "", "?" + params.toString());
    setActiveTab("library");
  }

  return (
    <div className="today-panel">
      <span className="eyebrow">Welcome back</span>
      <h2 className="today-greeting">Good to see you, {firstName}.</h2>

      {challenge ? (
        <div className="challenge-card">
          <div className="detail-cover" style={{ background: challenge.cover }}>
            <span>{challenge.bookTitle.charAt(0)}</span>
          </div>
          <div className="challenge-body">
            <span className="challenge-label">Today's chapter</span>
            <h3>{challenge.label}</h3>
            <p>
              {challenge.minutes} min, from {challenge.bookTitle}.
            </p>
            <button
              type="button"
              className="btn btn-gold"
              onClick={handleReadNow}
              disabled={completedToday}
            >
              {completedToday ? "Done for today" : "Read now"}
            </button>
          </div>
        </div>
      ) : (
        <p className="today-empty">
          Save a book from the library, and today's chapter shows up here.
        </p>
      )}
    </div>
  );
}