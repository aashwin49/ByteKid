import React from 'react';

const getBadge = (points) => {
  if (points >= 100) return "🥇 Gold Badge";
  if (points >= 50) return "🥈 Silver Badge";
  if (points >= 20) return "🥉 Bronze Badge";
  return "🔒 No Badge Yet";
};

export default function Leaderboard() {
  const mockData = [
    { name: "Alice", points: 80 },
    { name: "Bob", points: 60 },
    { name: "Charlie", points: 40 },
    { name: "You", points: parseInt(localStorage.getItem("points")) || 0 }
  ];

  const sortedData = [...mockData].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3">Points</th>
            <th className="p-3">Badge</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user, index) => (
            <tr
              key={index}
              className={`border-b border-gray-700 ${
                user.name === "You" ? "bg-blue-900/30 font-bold" : ""
              }`}
            >
              <td className="p-3">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                #{index + 1}
              </td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">⭐ {user.points}</td>
              <td className="p-3">{getBadge(user.points)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}