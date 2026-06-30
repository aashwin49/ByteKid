import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, default: 0 },
    completedChallenges: { type: [Number], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
