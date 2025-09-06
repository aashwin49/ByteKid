import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-white">🚀 Welcome to ByteKid</h1>
      <p className="text-gray-400 max-w-lg">
        Learn, practice, and level up your coding skills through fun challenges.
      </p>
      <div className="flex gap-4">
        <Link to="/playground">
          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-bold">
            Start Coding
          </button>
        </Link>
        <Link to="/leaderboard">
          <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 text-white font-bold">
            View Leaderboard
          </button>
        </Link>
      </div>
    </div>
  );
}