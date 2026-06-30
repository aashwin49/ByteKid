import express from "express";
import { getProgress, saveProgress } from "../controllers/progress.controller.js";

const router = express.Router();

router.get("/", getProgress);
router.post("/", saveProgress);

export default router;
