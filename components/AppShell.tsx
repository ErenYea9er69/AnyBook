"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";
import DashboardNav from "@/components/DashboardNav";
import LibraryPanel from "@/components/LibraryPanel";

function EmptyPanel({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="dash-empty">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function TodayPanel() {
  const { user } = useAuth();
  const rawName = user?.displayName || user?.email?.split("@")[0] || "reader";
  const firstName = rawName.split(" ")[0];

  return (
    <EmptyPanel
      eyebrow="Welcome back"
      title={`Good to see you, ${firstName}.`}
      description="Your one chapter for today lands here next, one clear task and a five-minute read."
    />
  );
}

// Picks the right panel for the active tab. Today gets a real greeting
// already; the other four are placeholders until their build steps.
function ActivePanel() {
  const { activeTab } = useDashboard();

  switch (activeTab) {
    case "today":
      return <TodayPanel />;
    case "library":
      return <LibraryPanel />;
    case "shelf":
      return (
        <EmptyPanel
          eyebrow="Shelf"
          title="Your saved and finished books"
          description="Mark a book read or save it for later, and it shows up on this shelf."
        />
      );
    case "progress":
      return (
        <EmptyPanel
          eyebrow="Progress"
          title="Your streak grid lands here"
          description="A full year of squares, your current streak, and your weekly goal."
        />
      );
    case "profile":
      return (
        <EmptyPanel
          eyebrow="Profile"
          title="Badges and milestones"
          description="Every milestone you clear shows up here, starting with your first finished book."
        />
      );
    default:
      return null;
  }
}

export default function AppShell() {
  return (
    <DashboardProvider>
      <div className="dash-shell">
        <DashboardNav />
        <div className="dash-content">
          <ActivePanel />
        </div>
      </div>
    </DashboardProvider>
  );
}   