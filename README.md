# ByteKid 🚀

ByteKid is a fun coding practice web app built to help beginners (especially kids) learn programming through small interactive challenges.

You can write code directly in the browser, run it, earn points, unlock badges, and compete on the leaderboard.

**Live demo:** https://byte-kid-rrru.vercel.app

## Features

- Interactive coding playground (write code inside the app)
- Beginner-friendly coding challenges (Hello World, Add Numbers, Reverse String, etc.)
- Run button to test your code and see output
- Progress tracking (see how much you've completed)
- Points and badge system to reward learning
- Leaderboard to compete and stay motivated
- Clean UI with simple navigation (Home / Playground / Leaderboard)
- Local Express.js backend with progress-save and leaderboard APIs (verified locally, not yet deployed — app falls back to local storage in production)

## Built With

**Frontend**
- React + Vite
- React Router
- Monaco Editor
- Framer Motion
- Lucide Icons

**Backend (local/demo)**
- Node.js
- Express.js
- REST APIs for progress saving and leaderboard retrieval

## Run Locally

Clone the repo:
```bash
git clone https://github.com/aashwin49/ByteKid.git
cd ByteKid
```

Install dependencies:
```bash
npm install
```

Start the frontend:
```bash
npm run dev
```

To run the backend locally (progress-save and leaderboard APIs), start the Express server in the `server/` directory following its own setup instructions.

## Future Improvements

- Deploy the Express backend (Render/Railway) and connect it to the live frontend
- Add more challenges and difficulty levels
- Add real user login + profiles
- Save progress permanently (database)
- Add more badges and rewards
