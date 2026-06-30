import { useEffect, useState } from "react";
import getBadge from "../getBadge";
import {
  getPlayerName,
  loadLocalProgress,
  saveLocalProgress,
  syncProgress,
} from "../services/progressApi";

const challenges = [
  {
    title: "Hello World",
    description: "Print 'Hello World' to the console.",
    starterCode: `console.log("Hello World");`,
    testCases: [{ input: "", expected: "Hello World" }],
  },
  {
    title: "Add Two Numbers",
    description: "Create a function add(a, b) that returns their sum.",
    starterCode: `function add(a, b) {\n  // Your code here\n}`,
    testCases: [
      { input: "console.log(add(2,3));", expected: "5" },
      { input: "console.log(add(-10,15));", expected: "5" },
    ],
  },
  {
    title: "Reverse a String",
    description: "Write reverseString(str) to return the string reversed.",
    starterCode: `function reverseString(str) {\n  // Your code here\n}`,
    testCases: [
      { input: `console.log(reverseString("hello"));`, expected: "olleh" },
      { input: `console.log(reverseString("ByteKid"));`, expected: "diKetyB" },
    ],
  },
  {
    title: "Calculate Factorial",
    description: "Implement factorial(n) to compute factorial of n.",
    starterCode: `function factorial(n) {\n  // Your code here\n}`,
    testCases: [
      { input: "console.log(factorial(5));", expected: "120" },
      { input: "console.log(factorial(0));", expected: "1" },
    ],
  },
  {
    title: "Palindrome Checker",
    description: "Build isPalindrome(str) that returns true if str is a palindrome.",
    starterCode: `function isPalindrome(str) {\n  // Your code here\n}`,
    testCases: [
      { input: `console.log(isPalindrome("madam"));`, expected: "true" },
      { input: `console.log(isPalindrome("hello"));`, expected: "false" },
    ],
  },
];

export default function Playground({ points, setPoints }) {
  const [code, setCode] = useState(challenges[0].starterCode);
  const [output, setOutput] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [syncStatus, setSyncStatus] = useState("Saved locally");

  useEffect(() => {
    const saved = loadLocalProgress();
    setCompletedChallenges(saved.completedChallenges);
    setPoints(saved.points);
    getPlayerName();
  }, [setPoints]);

  const challenge = challenges[currentChallenge];
  const progress = (completedChallenges.length / challenges.length) * 100;

  const saveProgress = async (nextPoints, nextCompletedChallenges) => {
    const progressData = {
      points: nextPoints,
      completedChallenges: nextCompletedChallenges,
    };

    saveLocalProgress(progressData);
    const result = await syncProgress(progressData);
    setSyncStatus(result.offline ? "Saved locally - backend offline" : "Synced to leaderboard");
  };

  const runCode = async () => {
    const results = [];
    let allPassed = true;

    challenge.testCases.forEach((test, index) => {
      const logs = [];
      const oldLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));

      try {
        eval(`${code}\n${test.input}`);
      } catch (error) {
        logs.push(`Error: ${error.message}`);
        allPassed = false;
      } finally {
        console.log = oldLog;
      }

      const actual = logs.join("\n").trim();

      if (actual === test.expected) {
        results.push(`Test ${index + 1} passed`);
      } else {
        results.push(`Test ${index + 1} failed: expected "${test.expected}", got "${actual}"`);
        allPassed = false;
      }
    });

    if (allPassed && !completedChallenges.includes(currentChallenge)) {
      const nextCompletedChallenges = [...completedChallenges, currentChallenge];
      const nextPoints = points + 10;

      setCompletedChallenges(nextCompletedChallenges);
      setPoints(nextPoints);
      await saveProgress(nextPoints, nextCompletedChallenges);
      results.push("Challenge complete. +10 points added to the leaderboard.");
    } else if (allPassed) {
      results.push("Challenge already completed. Your leaderboard score is unchanged.");
    }

    setOutput(results.join("\n"));
  };

  const resetProgress = async () => {
    if (window.confirm("Reset all progress?")) {
      const nextCompletedChallenges = [];
      setCompletedChallenges(nextCompletedChallenges);
      setPoints(0);
      setCurrentChallenge(0);
      setCode(challenges[0].starterCode);
      setOutput("Progress reset.");
      await saveProgress(0, nextCompletedChallenges);
    }
  };

  return (
    <div className="container playground-page">
      <section className="dashboard">
        <div className="stats-grid">
          <div className="stat-card points">
            <div className="stat-icon">★</div>
            <div className="stat-content">
              <h3>Points</h3>
              <p>{points}</p>
            </div>
          </div>

          <div className="stat-card badge">
            <div className="stat-icon">◎</div>
            <div className="stat-content">
              <h3>Badge</h3>
              <p>{getBadge(points)}</p>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p>{completedChallenges.length} / {challenges.length}</p>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <div>
            <h3>Your Progress</h3>
            <p>{syncStatus}</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <strong>{Math.round(progress)}% Complete</strong>
        </div>
      </section>

      <section className="challenges-section">
        <h2 className="section-title">Select a Challenge</h2>
        <div className="challenge-cards">
          {challenges.map((item, index) => (
            <button
              key={item.title}
              className={`challenge-card ${
                completedChallenges.includes(index) ? "completed-challenge" : ""
              } ${currentChallenge === index ? "active-challenge" : ""}`}
              onClick={() => {
                setCurrentChallenge(index);
                setCode(item.starterCode);
                setOutput("");
              }}
              type="button"
            >
              <span className="challenge-number">{index + 1}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              {completedChallenges.includes(index) && <span className="completed-check">✓</span>}
            </button>
          ))}
        </div>
      </section>

      <section className="current-challenge">
        <p className="eyebrow">Current Mission</p>
        <h2>{challenge.title}</h2>
        <p>{challenge.description}</p>
      </section>

      <section className="editor-container">
        <div className="editor-header">
          <h3>Your Code</h3>
          <span>{challenge.testCases.length} tests</span>
        </div>
        <textarea
          className="editor"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck="false"
        />
      </section>

      <div className="actions">
        <button className="btn btn-run" onClick={runCode} type="button">
          ▶ Run Tests
        </button>
        <button className="btn btn-reset" onClick={resetProgress} type="button">
          Reset Progress
        </button>
      </div>

      <section className="output-console">
        <div className="console-header">
          <h3>Output</h3>
        </div>
        <div className="console-content">
          {output ? (
            output.split("\n").map((line) => <p key={line}>{line}</p>)
          ) : (
            <p>Run tests to see output...</p>
          )}
        </div>
      </section>
    </div>
  );
}
