import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to Wonderland!</h1>
        <p>
          Discover trending movies and manage your favorite picks seamlessly.
        </p>
      </header>

      <main>
        {/* Signed Out State */}
        <SignedOut>
          <p>Please sign in to access personalized features.</p>
          <SignInButton mode="modal" />
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
          <p>You're signed in! 🎉</p>
          <UserButton />
          <p>
            Navigate to the <a href="/dashboard">Dashboard</a> to see more!
          </p>
        </SignedIn>
      </main>
    </div>
  );
}

export default HomePage;
