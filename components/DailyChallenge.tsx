"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDashboard } from "@/lib/dashboard-context";
import { fetchAllBooks } from "@/lib/books";
import { ANGLE_DEFS } from "@/lib/angles";
import {
  getDailyChallenge,
  setDailyChallenge,
  hasReadChallengeToday,
  addReadingEntry,
} from "@/lib/reading-tracker";

export default function DailyChallenge() {
  const { user } = useAuth();
  const { setActiveTab } = useDashboard();
  const [challenge, setChallenge] = useState<{
    bookId: string;
    bookTitle: string;
    angleKey: string;
    angleLabel: string;
    minutes: number;
  } | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!user) return;
    const existing = getDailyChallenge();
    if (existing) {
      setChallenge(existing);
      setDone(hasReadChallengeToday(existing.bookId, existing.angleKey));
    } else {
      fetchAllBooks().then((books) => {
        if (books.length === 0) return;
        const book = books[Math.floor(Math.random() * books.length)];
        const angle = ANGLE_DEFS[Math.floor(Math.random() * ANGLE_DEFS.length)];
        const c = {
          bookId: book.id,
          bookTitle: book.title,
          angleKey: angle.key,
          angleLabel: angle.label,
          minutes: Math.floor(Math.random() * 4) + 2,
        };
        setDailyChallenge(c);
        setChallenge(c);
        setDone(false);
      });
    }
  }, [user]);

  if (!user || !challenge) return null;

  const handleRead = () => {
    addReadingEntry({
      bookId: challenge.bookId,
      bookTitle: challenge.bookTitle,
      angleKey: challenge.angleKey,
      angleLabel: challenge.angleLabel,
    });
    setDone(true);
    const params = new URLSearchParams(window.location.search);
    params.set("book", challenge.bookId);
    window.history.pushState({}, "", "?" + params.toString());
    setActiveTab("library");
  };

  return (
    <section className="daily-challenge">
      <div className="wrap">
        <div className="challenge-card">
          <div className="challenge-header">
            <span className="challenge-eyebrow">Today&apos;s chapter</span>
            {done && (
              <span className="challenge-done-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 12 9 17 20 6" />
                </svg>
                Done
              </span>
            )}
          </div>
          <h3 className="challenge-title">{challenge.bookTitle}</h3>
          <p className="challenge-meta">
            {challenge.angleLabel} · ~{challenge.minutes} min read
          </p>
          <button
            className={`btn ${done ? "btn-outline" : "btn-gold"}`}
            onClick={handleRead}
            disabled={done}
          >
            {done ? "Completed" : "Read now"}
          </button>
        </div>
      </div>
    </section>
  );
}