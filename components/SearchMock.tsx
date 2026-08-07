"use client";

import { useEffect, useState } from "react";
import { openAuthModal } from "@/lib/auth-modal";

const TITLES = ["Atomic Habits", "Sapiens", "Meditations", "Educated", "The Odyssey"];

// This only ever renders on the landing page, which only ever renders for
// a signed-out visitor (see page.tsx). Every click here means sign up,
// full stop, no auth check needed.
export default function SearchMock() {
  const [text, setText] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with a media query, not derivable during render
      setText(TITLES[0]);
      return;
    }

    let ti = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const word = TITLES[ti];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ti = (ti + 1) % TITLES.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 35 : 70);
    }

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  function handleActivate() {
    openAuthModal("signup");
  }

  return (
    <div
      className="search-mock"
      id="searchMock"
      role="button"
      tabIndex={0}
      aria-label="Search this title"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span className="type-field" id="typeField">
        {text}
      </span>
    </div>
  );
}