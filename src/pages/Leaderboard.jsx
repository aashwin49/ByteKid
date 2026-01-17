import getBadge from "../getBadge";

function Leaderboard() {
 

 const mockData = [
    { name: "Alice", points: 50 },
    { name: "Bob", points: 40 },
    { name: "Charlie", points: 30 },
    { name: "You", points: parseInt(localStorage.getItem("points")) || 0 },
  ];

  const sortedData = [...mockData].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard-container">
      <h2 className="text-2xl font-bold text-[#3a0ca3] mb-6 flex items-center gap-2">
         Leaderboard 🏆
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[#4361ee] text-white">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Points</th>
              <th className="p-3 text-left">Badge</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <tr
                key={index}
                className={`border-b ${
                  user.name === "You" ? "bg-yellow-100 font-bold" : ""
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
    </div>
  );
}

export default Leaderboard;