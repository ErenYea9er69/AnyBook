"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { BADGE_INFO, BADGE_ORDER, getUnlockedBadges, type UnlockedBadge } from "@/lib/reading-storage";

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
    return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

function formatUnlockedDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Flat, no animation on load, per the spec: badges just show earned or
// not, with the date they were earned once they are.
export default function ProfilePanel() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState<UnlockedBadge[]>([]);

  useEffect(() => {
    if (!user) return;
    setUnlocked(getUnlockedBadges(user.uid));
  }, [user]);

  if (!user) return null;

  const unlockedMap = new Map(unlocked.map((b) => [b.id, b.unlockedAt]));
  const displayName = user.displayName || user.email?.split("@")[0] || "Reader";

  return (
    <div className="profile-panel">
      <span className="eyebrow">Profile</span>
      <h2 className="profile-title">Your account</h2>

      <div className="profile-card">
        <span className="profile-avatar">{getInitials(user.displayName, user.email)}</span>
        <div className="profile-info">
          <span className="profile-name">{displayName}</span>
          {user.email && <span className="profile-email">{user.email}</span>}
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => signOut(auth)}
        >
          Sign out
        </button>
      </div>

      <h3 className="badges-heading">Badges</h3>
      <div className="badges-grid">
        {BADGE_ORDER.map((id) => {
          const info = BADGE_INFO[id];
          const unlockedAt = unlockedMap.get(id);
          const isUnlocked = unlockedAt !== undefined;

          return (
            <div key={id} className={`badge-card${isUnlocked ? " is-unlocked" : ""}`}>
              <span className="badge-icon">
                {isUnlocked ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="8 12.5 11 15.5 16 9" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                  </svg>
                )}
              </span>
              <span className="badge-label">{info.label}</span>
              <span className="badge-desc">{info.description}</span>
              <span className="badge-status">
                {isUnlocked ? `Earned ${formatUnlockedDate(unlockedAt!)}` : "Locked"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}