"use client";

import { useOnboarding } from "@/lib/onboarding-context";

export default function OnboardingModal() {
  const { isOpen, closeOnboarding } = useOnboarding();

  if (!isOpen) return null;

  return (
    <div className="auth-overlay">
      <div className="auth-overlay-backdrop" onClick={closeOnboarding} />
      <div className="auth-modal">
        <button className="auth-close" onClick={closeOnboarding}>×</button>
        <div className="auth-modal-content">
          <h2>Welcome to AnyBook!</h2>
          <p>Let's get you set up with your reading goals.</p>
          <button className="btn btn-gold" style={{ marginTop: "20px" }} onClick={closeOnboarding}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
