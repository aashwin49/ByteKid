import Dashboard from "../components/Dashboard";

function Playground() {
  // Example state values (replace with localStorage / logic later)
  const points = parseInt(localStorage.getItem("points")) || 0;
  const completed = JSON.parse(localStorage.getItem("completedChallenges"))?.length || 0;
  const total = 5;

  const getBadge = (points) => {
    if (points >= 30) return "🏆 Pro Coder";
    if (points >= 20) return "🧑‍💻 Intermediate";
    if (points >= 10) return "👶 Beginner";
    return "🔓 No Badge Yet";
  };

  return (
    <div>
      <Dashboard
        points={points}
        badge={getBadge(points)}
        completed={completed}
        total={total}
      />
      {/* other sections: ChallengeSelector, CodeEditor, etc */}
    </div>
  );
}