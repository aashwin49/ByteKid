import jwt from "jsonwebtoken";

const makeToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET || "demo_secret", {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: "name and email required" });

  const demoUser = { id: "demo_user_123", name, email };
  const token = makeToken({ id: demoUser.id, email: demoUser.email });

  return res.status(201).json({
    message: "Registered (demo mode)",
    token,
    user: demoUser,
  });
};

export const login = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "email required" });

  const demoUser = { id: "demo_user_123", name: "Demo User", email };
  const token = makeToken({ id: demoUser.id, email: demoUser.email });

  return res.json({
    message: "Login (demo mode)",
    token,
    user: demoUser,
  });
};
