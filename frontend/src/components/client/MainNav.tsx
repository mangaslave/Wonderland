import { Link } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="text-lg font-bold">
        <Link to="/">Wonderland</Link>
      </div>
      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/watchlist" className="hover:underline">
          Watchlist
        </Link>
        <Link to="/settings" className="hover:underline">
          Settings
        </Link>
      </nav>
        <SignOutButton/>
      
    </header>
  );
};

export default Navbar;

