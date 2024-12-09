import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<App />} />
          <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
          <Route path="/saved" element={<WatchlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/signin" element={<App />} /> 
          <Route path="/signup" element={<App />} /> 
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </StrictMode>
);
