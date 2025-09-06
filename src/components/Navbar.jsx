import { Link } from "react-router-dom";

function Navbar() {
  const points = localStorage.getItem("points") || 0;

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">ByteKid</Link>
      </h1>
      <nav className="flex gap-4">
        <Link to="/playground" className="hover:underline">Playground</Link>
        <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
      </nav>
      <div>⭐ {points}</div>
    </header>
  );
}

export default Navbar;