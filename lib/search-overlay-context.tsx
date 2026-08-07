"use client";

import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";

type SearchOverlayContextValue = {
  isOpen: boolean;
  query: string;
  openOverlay: (query?: string) => void;
  closeOverlay: () => void;
};

const SearchOverlayContext = createContext<SearchOverlayContextValue | null>(
  null
);

export function SearchOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsOpen(params.has("search"));
      setQuery(params.get("q") || "");
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openOverlay = useCallback((q?: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", "true");
    if (q) params.set("q", q);
    params.delete("book");

    const newUrl = "?" + params.toString();
    window.history.pushState({}, "", newUrl);

    setIsOpen(true);
    setQuery(q ?? "");
  }, []);

  const closeOverlay = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("q");
    params.delete("book");

    const newUrl = params.toString() ? "?" + params.toString() : window.location.pathname;
    window.history.pushState({}, "", newUrl);

    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      query,
      openOverlay,
      closeOverlay,
    }),
    [isOpen, query, openOverlay, closeOverlay]
  );

  return (
    <SearchOverlayContext.Provider value={value}>
      {children}
    </SearchOverlayContext.Provider>
  );
}

export function useSearchOverlay() {
  const ctx = useContext(SearchOverlayContext);
  if (!ctx) {
    throw new Error(
      "useSearchOverlay must be used within a SearchOverlayProvider"
    );
  }
  return ctx;
}
