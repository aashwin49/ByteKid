import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  points: number;
  badge: string;
}

function Navbar({ points, badge }: NavbarProps) {
  const location = useLocation();

  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          <i className="fas fa-laptop-code"></i>
          <span>ByteKid</span>
        </div>

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
