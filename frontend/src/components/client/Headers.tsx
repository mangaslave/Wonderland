import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
        style={{ width: "250px" }}
      >
        <nav className="p-6">
          <h2 className="text-xl font-bold mb-4">Wonderland</h2>
          <ul className="space-y-4">
            <li>
              <a href="/search" className="hover:underline">
                Search
              </a>
            </li>
            <li>
              <a href="/account" className="hover:underline">
                Account
              </a>
            </li>
            <li>
              <a href="/saved" className="hover:underline">
                Saved
              </a>
            </li>
            <li>
              <a href="/help" className="hover:underline">
                Help
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
