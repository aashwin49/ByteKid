// Define explicit interfaces for your payloads
export interface LocalProgress {
  points: number;
  completedChallenges: number[]; // Array of challenge indices
}

export interface SyncPayload extends LocalProgress {
  name: string;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  isCurrentPlayer?: boolean;
  rank?: number;
}

export interface SyncResponse {
  offline?: boolean;
  error?: string;
  progress?: SyncPayload;
}

const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:5001/api";
const PLAYER_NAME_KEY = "playerName";

export const getPlayerName = (): string => {
  const savedName = localStorage.getItem(PLAYER_NAME_KEY);

  if (savedName) {
    return savedName;
  }

  const defaultName = `Coder ${Math.floor(1000 + Math.random() * 9000)}`;
  localStorage.setItem(PLAYER_NAME_KEY, defaultName);
  return defaultName;
};

export const loadLocalProgress = (): LocalProgress => ({
  points: Number.parseInt(localStorage.getItem("points") || "0", 10),
  completedChallenges: JSON.parse(localStorage.getItem("completedChallenges") || "[]"),
});

export const saveLocalProgress = ({ points, completedChallenges }: LocalProgress): void => {
  localStorage.setItem("points", String(points));
  localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges));
};

export const syncProgress = async ({ points, completedChallenges }: LocalProgress): Promise<SyncResponse> => {
  const payload: SyncPayload = {
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { offline: true, error: errorMessage, progress: payload };
  }
};

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
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
