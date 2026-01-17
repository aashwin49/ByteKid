// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Welcome to <span className="brand">ByteKid 🚀</span>
        </h1>
        <p className="hero-subtitle">
          Sharpen your coding skills with fun and interactive challenges.
        </p>
        <Link to="/playground" className="cta-btn">
          Start Coding
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <i className="fas fa-code"></i>
          <h3>Interactive Playground</h3>
          <p>Practice coding with instant feedback and test cases.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-trophy"></i>
          <h3>Earn Points & Badges</h3>
          <p>Level up as you complete challenges and unlock badges.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-users"></i>
          <h3>Compete on Leaderboards</h3>
          <p>Challenge your friends and climb the ranks!</p>
        </div>
      </section>
    </div>
  );
}