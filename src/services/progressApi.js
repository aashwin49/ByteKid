const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const PLAYER_NAME_KEY = "playerName";

export const getPlayerName = () => {
  const savedName = localStorage.getItem(PLAYER_NAME_KEY);

  if (savedName) {
    return savedName;
  }

  const defaultName = `Coder ${Math.floor(1000 + Math.random() * 9000)}`;
  localStorage.setItem(PLAYER_NAME_KEY, defaultName);
  return defaultName;
};

export const loadLocalProgress = () => ({
  points: Number.parseInt(localStorage.getItem("points"), 10) || 0,
  completedChallenges: JSON.parse(localStorage.getItem("completedChallenges") || "[]"),
});

export const saveLocalProgress = ({ points, completedChallenges }) => {
  localStorage.setItem("points", String(points));
  localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges));
};

export const syncProgress = async ({ points, completedChallenges }) => {
  const payload = {
    name: getPlayerName(),
    points,
    completedChallenges,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Progress sync failed");
    }

    return await response.json();
  } catch (error) {
    return { offline: true, error: error.message, progress: payload };
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);

    if (!response.ok) {
      throw new Error("Leaderboard unavailable");
    }

    return await response.json();
  } catch {
    const localProgress = loadLocalProgress();

    return [
      { name: "Ava", points: 50 },
      { name: "Milo", points: 40 },
      { name: "Zara", points: 30 },
      { name: getPlayerName(), points: localProgress.points, isCurrentPlayer: true },
    ];
  }
};
