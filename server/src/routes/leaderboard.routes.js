import express from "express";
import { getDemoProgress } from "../controllers/progress.controller.js";

const router = express.Router();

const demoPlayers = [
  { name: "Ava", points: 50 },
  { name: "Milo", points: 40 },
  { name: "Zara", points: 30 },
];

router.get("/", (req, res) => {
  const progress = getDemoProgress();
  const players = [...demoPlayers, {
    name: progress.name || "You",
    points: progress.points || 0,
    isCurrentPlayer: true,
  }];

  res.json(
    players
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({ ...player, rank: index + 1 }))
  );
});

export default router;
