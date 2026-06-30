import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Playground from "./pages/Playground";
import Leaderboard from "./pages/Leaderboard";
import getBadge from "./getBadge";
import { loadLocalProgress } from "./services/progressApi";

function App() {
  const [points, setPoints] = useState(() => loadLocalProgress().points);

  useEffect(() => {
    localStorage.setItem("points", String(points));
  }, [points]);

  return (
    <div className="app-wrapper">
      <Navbar points={points} badge={getBadge(points)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/playground"
            element={<Playground points={points} setPoints={setPoints} />}
          />
          <Route path="/leaderboard" element={<Leaderboard points={points} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
