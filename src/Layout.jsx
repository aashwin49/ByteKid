// src/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header / Navbar */}
      <header className="py-4 px-6 md:px-12 border-b border-gray-700/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Code2 className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white tracking-wider">
            ByteKid
          </h1>
        </div>
        <nav className="flex gap-6 text-gray-300 text-sm font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/playground" className="hover:text-white transition">Playground</Link>
          <Link to="/leaderboard" className="hover:text-white transition">Leaderboard</Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="p-4 md:p-8">{children}</main>

      {/* Footer */}
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-700/50">
        <p>Ready to level up your coding skills?</p>
      </footer>
    </div>
  );
}