import { Link, useLocation } from "react-router-dom";

function Navbar({ points, badge }) {
  const location = useLocation();

  return (
    <header>
      <div className="container header-content">
        {/* Logo */}
        <div className="logo">
          <i className="fas fa-laptop-code"></i>
          <span>ByteKid</span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/playground"
                className={location.pathname === "/playground" ? "active" : ""}
              >
                Playground
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className={location.pathname === "/leaderboard" ? "active" : ""}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>

        {/* ✅ Dynamic Stats */}
        <div className="nav-stats">
          <span className="points">⭐ {points}</span>
          <span className="divider">|</span>
          <span className="level">{badge}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;