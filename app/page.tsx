"use client";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";
import LandingView from "@/components/LandingView";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

// Reads auth state and picks the view. Split from Home() below because
// useAuth only works inside AuthProvider, and Home() is what renders
// AuthProvider in the first place.
function HomeContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Loading"
      >
        <span className="spinner" />
      </main>
    );
  }

  if (user) {
    return <AppShell />;
  }

  return (
    <>
      <LandingView />
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <div className="grain"></div>

      <Header />
      <AuthModal />

      <HomeContent />
    </AuthProvider>
  );
}