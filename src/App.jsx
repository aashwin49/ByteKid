import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Playground from "./pages/Playground";
import Leaderboard from "./pages/Leaderboard";
import getBadge from "./getBadge";

function App() {
  const [points, setPoints] = useState(
    parseInt(localStorage.getItem("points")) || 0
  );

  useEffect(() => {
    localStorage.setItem("points", points);
  }, [points]);

  return (
    <div className="app-wrapper">
      <Navbar points={points} badge={getBadge(points)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<Playground setPoints={setPoints} />} />
          <Route path="/leaderboard" element={<Leaderboard points={points} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;