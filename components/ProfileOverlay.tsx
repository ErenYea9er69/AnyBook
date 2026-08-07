"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Book } from "@/lib/books";
import {
  getStreakData,
  getSettings,
  getBadges,
  getSavedBooks,
  getReadingLog,
  StreakData,
  Badge,
} from "@/lib/reading-tracker";
import ReadingTracker from "./ReadingTracker";
import BadgesRow from "./BadgesRow";
import MonthlyChart from "./MonthlyChart";

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
    return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

export default function ProfileOverlay() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, totalActiveDays: 0, lastReadDate: null });
  const [badges, setBadges] = useState<Badge[]>([]);
  const [settings, setSettings] = useState(getSettings());
  const [books, setBooks] = useState<Book[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsOpen(params.has("profile"));
    };
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("no-scroll");
      return;
    }
    document.body.classList.add("no-scroll");
    setStreak(getStreakData());
    setBadges(getBadges());
    setSettings(getSettings());
    setSavedIds(getSavedBooks());
    setReadIds(new Set(getReadingLog().map((e: any) => e.bookId)));

    import("@/lib/books").then(({ fetchAllBooks }) => {
      fetchAllBooks().then(setBooks).catch(console.error);
    });

    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProfile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const closeProfile = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("profile");
    const newUrl = params.toString() ? "?" + params.toString() : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  };

  if (!isOpen || !user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "Reader";
  const savedBooks = books.filter(b => savedIds.includes(b.id));
  const readBooks = books.filter(b => readIds.has(b.id));

  return (
    <div className={`search-overlay${isOpen ? " is-open" : ""}`} style={{ zIndex: 200 }}>
      <div className="search-overlay-backdrop" onClick={closeProfile} />
      <div className="search-overlay-panel" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <div className="overlay-top" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 3vw, 32px)", color: "var(--on-ink)" }}>
              Your shelf
            </h2>
            <button className="overlay-close" type="button" aria-label="Close profile" onClick={closeProfile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <div className="profile-layout">
            <aside className="profile-rail">
              <div className="profile-identity">
                <div className="user-avatar large">{getInitials(user.displayName, user.email)}</div>
                <div className="profile-name">{displayName}</div>
                {user.email && <div className="profile-email">{user.email}</div>}
              </div>

              <div className="profile-stat-row">
                <div className="profile-stat">
                  <b>{streak.currentStreak}</b>
                  <span>Current streak</span>
                </div>
                <div className="profile-stat">
                  <b>{streak.longestStreak}</b>
                  <span>Longest streak</span>
                </div>
                <div className="profile-stat">
                  <b>{streak.totalActiveDays}</b>
                  <span>Active days</span>
                </div>
                <div className="profile-stat">
                  <b>{settings.weeklyGoal}</b>
                  <span>Weekly goal</span>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">Badges</h3>
                <BadgesRow badges={badges} />
              </div>
            </aside>

            <div className="profile-main">
              <div className="profile-section">
                <h3 className="profile-section-title">Reading log</h3>
                <ReadingTracker />
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">Books per month</h3>
                <MonthlyChart />
              </div>

              {savedBooks.length > 0 && (
                <div className="profile-section">
                  <h3 className="profile-section-title">Saved for later</h3>
                  <div className="profile-mini-shelf">
                    {savedBooks.map(b => (
                      <div key={b.id} className="mini-book">
                        <div className="mini-cover" style={{ background: b.cover }}>
                          {b.title.charAt(0)}
                        </div>
                        <span className="mini-title">{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {readBooks.length > 0 && (
                <div className="profile-section">
                  <h3 className="profile-section-title">Finished</h3>
                  <div className="profile-mini-shelf">
                    {readBooks.map(b => (
                      <div key={b.id} className="mini-book">
                        <div className="mini-cover" style={{ background: b.cover }}>
                          {b.title.charAt(0)}
                        </div>
                        <span className="mini-title">{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}