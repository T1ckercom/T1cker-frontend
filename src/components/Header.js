import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left: Hamburger menu (for future use) */}
      <button className="text-2xl font-bold text-gray-600">☰</button>

      {/* Center: Placeholder for logo */}
      <h1 className="text-lg font-bold text-purple-700">My Finance App</h1>

      {/* Right: Sign-in button (for future use) */}
      <button className="text-gray-600 border border-gray-400 px-3 py-1 rounded">Sign In</button>
    </header>
  );
};

export default Header;
