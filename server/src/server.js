import app from "../app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

try {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", (error) => {
    console.error("Server error:", error.message);
    process.exitCode = 1;
  });
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
}
