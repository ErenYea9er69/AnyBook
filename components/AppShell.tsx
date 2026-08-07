"use client";

import { useAuth } from "@/lib/auth-context";

// The dashboard content for signed-in users. This is a placeholder for
// step 1. Step 3 replaces this body with the real tab nav (Today,
// Library, Shelf, Progress, Profile) and their sections.
export default function AppShell() {
  const { user } = useAuth();
  const rawName = user?.displayName || user?.email?.split("@")[0] || "reader";
  const firstName = rawName.split(" ")[0];

  return (
    <main
      style={{
        minHeight: "70vh",
        padding: "96px 24px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--sans)",
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--on-paper-dim)",
        }}
      >
        Welcome back
      </span>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(28px, 4vw, 42px)",
          color: "var(--on-paper)",
          margin: 0,
        }}
      >
        Good to see you, {firstName}.
      </h1>
      <p
        style={{
          fontFamily: "var(--sans)",
          color: "var(--on-paper-dim)",
          maxWidth: "480px",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        The dashboard is under construction. The daily chapter, your streak grid,
        your shelf, and your badges land here next.
      </p>
    </main>
  );
}