let demoProgress = {
  name: "You",
  points: 0,
  completedChallenges: [],
};

export const getDemoProgress = () => demoProgress;

export const getProgress = async (req, res) => {
  return res.json({
    userId: req.user?.id || "demo_user_123",
    ...demoProgress,
    mode: "demo",
  });
};

export const saveProgress = async (req, res) => {
  const { name, points, completedChallenges } = req.body;

  demoProgress = {
    name: typeof name === "string" && name.trim() ? name.trim() : demoProgress.name,
    points: typeof points === "number" ? points : demoProgress.points,
    completedChallenges: Array.isArray(completedChallenges)
      ? completedChallenges
      : demoProgress.completedChallenges,
  };

  return res.json({
    message: "Progress saved",
    progress: demoProgress,
  });
};
