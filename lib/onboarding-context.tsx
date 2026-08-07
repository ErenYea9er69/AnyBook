"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type OnboardingContextValue = {
  isOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openOnboarding: () => setIsOpen(true),
      closeOnboarding: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
