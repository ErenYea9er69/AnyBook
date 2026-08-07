"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const DASH_TABS = ["today", "library", "shelf", "progress", "profile"] as const;
export type DashTab = (typeof DASH_TABS)[number];

function isDashTab(value: string | null): value is DashTab {
  return !!value && (DASH_TABS as readonly string[]).includes(value);
}

type DashboardContextValue = {
  activeTab: DashTab;
  setActiveTab: (tab: DashTab) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

// Same URL-driven pattern as search-overlay-context and AuthModal: the
// active tab lives in a query param, so the back button and a shared
// link both land on the right tab.
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<DashTab>("today");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTabState(isDashTab(params.get("tab")) ? (params.get("tab") as DashTab) : "today");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const setActiveTab = useCallback((tab: DashTab) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.pushState({}, "", "?" + params.toString());
    setActiveTabState(tab);
  }, []);

  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab, setActiveTab]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
}