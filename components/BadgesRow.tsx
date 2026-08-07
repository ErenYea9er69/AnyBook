"use client";

import { Badge } from "@/lib/reading-tracker";

export default function BadgesRow({ badges }: { badges: Badge[] }) {
  if (!badges || badges.length === 0) {
    return <p className="badge-desc">No badges yet.</p>;
  }

  return (
    <div className="badges-row">
      {badges.map((b) => (
        <div key={b.id} className={`badge-coin ${b.unlocked ? "unlocked" : ""}`}>
          <div className="badge-ring">★</div>
          <div className="badge-name">{b.name}</div>
        </div>
      ))}
    </div>
  );
}
