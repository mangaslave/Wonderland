import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="/logo.svg" alt="App Logo" className="w-32 h-32 mb-4" />
      <h1 className="text-2xl font-bold mb-6">Welcome to Watchlist</h1>

      <SignedOut>
        <div className="space-x-4">
          <SignInButton>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <p className="mb-4 text-lg">You're already signed in! 🎉</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Go to Dashboard
          </button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default App;


