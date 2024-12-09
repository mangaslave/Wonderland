import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import UserSignupSync from "./UserSync";
import WatchlistPage from "./pages/Saved";
import MovieDetailPage from "./pages/MoviePage";
import AccountPage from "./pages/AccountPage";

if (!import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key. Set VITE_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env.local file.");
}

const clerkKey = import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY!;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <Router>
        <UserSignupSync />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<App />} />
          <Route path="/signup" element={<App />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/saved"
            element={
              <SignedIn>
                <WatchlistPage />
              </SignedIn>
            }
          />
          <Route
            path="/account"
            element={
              <SignedIn>
                <AccountPage />
              </SignedIn>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <SignedIn>
                <MovieDetailPage />
              </SignedIn>
            }
          />

          <Route
            path="*"
            element={
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  </StrictMode>
);

