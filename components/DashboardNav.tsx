"use client";

import { DASH_TABS, type DashTab, useDashboard } from "@/lib/dashboard-context";

const NAV_LABELS: Record<DashTab, string> = {
  today: "Today",
  library: "Library",
  shelf: "Shelf",
  progress: "Progress",
  profile: "Profile",
};

function TabIcon({ tab }: { tab: DashTab }) {
  const shared = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (tab) {
    case "today":
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
          <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
          <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
        </svg>
      );
    case "library":
      return (
        <svg {...shared}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "shelf":
      return (
        <svg {...shared}>
          <rect x="3" y="4" width="18" height="6" rx="1" />
          <rect x="3" y="14" width="18" height="6" rx="1" />
        </svg>
      );
    case "progress":
      return (
        <svg {...shared}>
          <line x1="5" y1="20" x2="5" y2="12" />
          <line x1="12" y1="20" x2="12" y2="6" />
          <line x1="19" y1="20" x2="19" y2="15" />
        </svg>
      );
    case "profile":
      return (
        <svg {...shared}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.6-3.6 4.8-5.5 8-5.5s6.4 1.9 8 5.5" />
        </svg>
      );
  }
}

// Renders both the desktop sidebar and the mobile bottom tab bar from the
// same data, so a new tab only ever gets added in one place. CSS decides
// which of the two containers shows at a given screen width.
export default function DashboardNav() {
  const { activeTab, setActiveTab } = useDashboard();

  const items = DASH_TABS.map((tab) => (
    <button
      key={tab}
      type="button"
      className={`dash-nav-item${activeTab === tab ? " is-active" : ""}`}
      aria-current={activeTab === tab ? "page" : undefined}
      onClick={() => setActiveTab(tab)}
    >
      <TabIcon tab={tab} />
      <span>{NAV_LABELS[tab]}</span>
    </button>
  ));

  return (
    <>
      <nav className="dash-sidebar" aria-label="Dashboard sections">
        {items}
      </nav>
      <nav className="dash-tabbar" aria-label="Dashboard sections">
        {items}
      </nav>
    </>
  );
}