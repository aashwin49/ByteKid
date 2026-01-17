// src/pages/Playground.jsx
import { useState, useEffect } from "react";

// ----------------- Challenges -----------------
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
    description:
      "Build isPalindrome(str) that returns true if str is a palindrome.",
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

  // load saved progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedChallenges")) || [];
    setCompletedChallenges(saved);
  }, []);

  const challenge = challenges[currentChallenge];

  // run tests
  const runCode = () => {
    let results = [];
    let allPassed = true;

    challenge.testCases.forEach((test, i) => {
      let logs = [];
      const oldLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));

      try {
        eval(code + "\n" + test.input);
      } catch (err) {
        logs.push("Error: " + err.message);
        allPassed = false;
      }

      console.log = oldLog;
      const actual = logs.join("\n").trim();

      if (actual === test.expected) {
        results.push(`✅ Test ${i + 1} Passed`);
      } else {
        results.push(
          `❌ Test ${i + 1} Failed → Expected "${test.expected}", Got "${actual}"`
        );
        allPassed = false;
      }
    });

    // give points once per challenge
    if (allPassed && !completedChallenges.includes(currentChallenge)) {
      results.push("\n🎉 Challenge Complete! +10 Points!");
      const updated = [...completedChallenges, currentChallenge];
      setCompletedChallenges(updated);
      localStorage.setItem("completedChallenges", JSON.stringify(updated));

      const newPts = points + 10;
      setPoints(newPts); // 🔥 update parent state
      localStorage.setItem("points", newPts.toString());
    }

    setOutput(results.join("\n"));
  };

  // reset progress
  const resetProgress = () => {
    if (window.confirm("Reset all progress?")) {
      localStorage.clear();
      setCompletedChallenges([]);
      setPoints(0);
      setCurrentChallenge(0);
      setCode(challenges[0].starterCode);
      setOutput("Progress reset!");
    }
  };

  // badge logic
  const getBadge = (p) => {
    if (p >= 40) return "🥇 Gold";
    if (p >= 20) return "🥈 Silver";
    if (p >= 10) return "🥉 Bronze";
    return "🔒 None";
  };

  const progress = (completedChallenges.length / challenges.length) * 100;

  return (
    <div className="container">
      {/* Stats */}
      <section className="dashboard">
        <div className="stats-grid">
          <div className="stat-card points">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-content">
              <h3>Points</h3>
              <p>{points}</p>
            </div>
          </div>

          <div className="stat-card badge">
            <div className="stat-icon">
              <i className="fas fa-medal"></i>
            </div>
            <div className="stat-content">
              <h3>Badge</h3>
              <p>{getBadge(points)}</p>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p>
                {completedChallenges.length} / {challenges.length}
              </p>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h3>Your Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}% Complete</p>
        </div>
      </section>

      {/* Challenge Selector */}
      <section className="challenges-section">
        <h2 className="section-title">
          <i className="fas fa-tasks"></i> Select a Challenge
        </h2>
        <div className="challenge-cards">
          {challenges.map((ch, i) => (
            <div
              key={i}
              className={`challenge-card ${
                completedChallenges.includes(i) ? "completed-challenge" : ""
              }`}
              onClick={() => {
                setCurrentChallenge(i);
                setCode(ch.starterCode);
                setOutput("");
              }}
            >
              <div className="challenge-header">
                <h3>{ch.title}</h3>
                {completedChallenges.includes(i) && (
                  <i className="fas fa-check completed-check"></i>
                )}
              </div>
              <div className="challenge-content">
                <p>{ch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Challenge Info */}
      <section className="current-challenge">
        <h2 className="section-title">
          <i className="fas fa-code"></i> {challenge.title}
        </h2>
        <p>{challenge.description}</p>
      </section>

      {/* Editor */}
      <section className="editor-container">
        <div className="editor-header">
          <i className="fas fa-code"></i> <h3>Your Code</h3>
        </div>
        <textarea
          className="editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
      </section>

      {/* Actions */}
      <div className="actions">
        <button className="btn btn-run" onClick={runCode}>
          <i className="fas fa-play-circle"></i> Run Tests
        </button>
        <button className="btn btn-reset" onClick={resetProgress}>
          <i className="fas fa-redo"></i> Reset Progress
        </button>
      </div>

      {/* Output */}
      <section className="output-console">
        <div className="console-header">
          <i className="fas fa-terminal"></i> <h3>Output</h3>
        </div>
        <div className="console-content">
          {output ? (
            output.split("\n").map((line, i) => <p key={i}>{line}</p>)
          ) : (
            <p>
              <i>Run tests to see output...</i>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}