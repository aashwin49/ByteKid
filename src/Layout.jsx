import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Navbar */}
      <header className="py-4 px-6 md:px-12 border-b border-gray-700/50 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">ByteKid</h1>
        <nav className="flex gap-6 text-gray-300 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/playground">Playground</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      {/* Page content */}
      <main className="p-4 md:p-8">{children}</main>

      {/* Footer */}
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-700/50">
        <p>Ready to level up your coding skills?</p>
      </footer>
    </div>
  );
}