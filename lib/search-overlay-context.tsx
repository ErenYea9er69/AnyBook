"use client";

import { createContext, useContext, useMemo, useState } from "react";

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

  const value = useMemo(
    () => ({
      isOpen,
      query,
      openOverlay: (q?: string) => {
        setQuery(q ?? "");
        setIsOpen(true);
      },
      closeOverlay: () => setIsOpen(false),
    }),
    [isOpen, query]
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
