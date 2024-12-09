import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignOutButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white text-white">
      <div className="text-lg font-bold">
        <Link to="/dashboard"><img src="/logo.svg" alt="App Logo" className="w-14 h-14" /></Link>
      </div>

      <nav className="hidden md:flex space-x-4 text-black items-center justify-center">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/saved" className="hover:underline">
          Saved
        </Link>
        <Link to="/account" className="hover:underline">
          Account
        </Link>
        <SignOutButton>
          <Button variant="secondary" className="bg-red-500 text-white">
            Logout
          </Button>
        </SignOutButton>
      </nav>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-black">
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">Wonderland</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 space-y-4">
              <Link to="/dashboard" className="block text-lg hover:underline">
                Dashboard
              </Link>
              <Link to="/saved" className="block text-lg hover:underline">
                Saved
              </Link>
              <Link to="/account" className="block text-lg hover:underline">
                Account
              </Link>
              <SignOutButton>
                <Button
                  variant="secondary"
                  className="w-full bg-red-500 text-white mt-4"
                >
                  Logout
                </Button>
              </SignOutButton>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;


