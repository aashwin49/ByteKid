// src/pages/Playground.jsx
import Header from "../components/playground/Header";
import ChallengeSelector from "../components/playground/ChallengeSelector";
import ChallengeInfo from "../components/playground/ChallengeInfo";
import CodeEditor from "../components/playground/CodeEditor";
import OutputConsole from "../components/playground/OutputConsole";
import Actions from "../components/playground/Actions";

const challenges = [
  {
    title: "Hello World",
    description:
      "Print 'Hello World' to the console. This is the traditional first step in learning any new programming language.",
    starterCode: `console.log("Hello World");`,
    testCases: [{ input: "", expected: "Hello World" }],
  },
  {
    title: "Add Two Numbers",
    description:
      "Create a function named 'add' that takes two numbers, 'a' and 'b', as arguments and returns their sum.",
    starterCode: `function add(a, b) {
  // Your code here
}`,
    testCases: [
      { input: "console.log(add(2,3));", expected: "5" },
      { input: "console.log(add(-10,15));", expected: "5" },
      { input: "console.log(add(100,200));", expected: "300" },
    ],
  },
  {
    title: "Reverse a String",
    description:
      "Write a function 'reverseString' that takes a string and returns it in reverse order.",
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    testCases: [
      { input: 'console.log(reverseString("hello"));', expected: "olleh" },
      { input: 'console.log(reverseString("ByteKid"));', expected: "diKetyB" },
    ],
  },
  {
    title: "Calculate Factorial",
    description:
      "Implement a function 'factorial(n)' that computes the factorial of a non-negative integer 'n'.",
    starterCode: `function factorial(n) {
  // Your code here
}`,
    testCases: [
      { input: "console.log(factorial(5));", expected: "120" },
      { input: "console.log(factorial(0));", expected: "1" },
      { input: "console.log(factorial(1));", expected: "1" },
    ],
  },
  {
    title: "Palindrome Checker",
    description:
      "Build a function 'isPalindrome(str)' that returns true if a string is a palindrome and false otherwise.",
    starterCode: `function isPalindrome(str) {
  // Your code here
}`,
    testCases: [
      { input: 'console.log(isPalindrome("madam"));', expected: "true" },
      { input: 'console.log(isPalindrome("level"));', expected: "true" },
      { input: 'console.log(isPalindrome("hello"));', expected: "false" },
    ],
  },
];

function Playground() {
  const [code, setCode] = useState(challenges[0].starterCode);
  const [output, setOutput] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [points, setPoints] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Load saved progress
  useEffect(() => {
    try {
      const savedChallenges =
        JSON.parse(localStorage.getItem("completedChallenges")) || [];
      const savedPoints = parseInt(localStorage.getItem("points")) || 0;
      setCompletedChallenges(savedChallenges);
      setPoints(savedPoints);
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
      localStorage.clear();
    }
  }, []);

  const challenge = challenges[currentChallenge];

  const runCode = () => {
    setIsRunning(true);
    let results = [];
    let allPassed = true;

    challenge.testCases.forEach((test, index) => {
      let logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));

      try {
        eval(code + "\n" + test.input);
      } catch (err) {
        logs.push("Error: " + err.message);
        allPassed = false;
      }

      console.log = originalLog;
      const actual = logs.join("\n").trim();

      if (actual === test.expected) {
        results.push(`✅ Test ${index + 1} Passed`);
      } else {
        results.push(
          `❌ Test ${index + 1} Failed: Expected "${test.expected}", got "${actual}"`
        );
        allPassed = false;
      }
    });

    if (allPassed && !completedChallenges.includes(currentChallenge)) {
      results.push("\n🎉 Challenge Complete! +10 Points!");
      const updated = [...completedChallenges, currentChallenge];
      setCompletedChallenges(updated);
      localStorage.setItem("completedChallenges", JSON.stringify(updated));

      const newPoints = points + 10;
      setPoints(newPoints);
      localStorage.setItem("points", newPoints.toString());
    }

    setOutput(results.join("\n"));
    setIsRunning(false);
  };

  const switchChallenge = (index) => {
    setCurrentChallenge(index);
    setCode(challenges[index].starterCode);
    setOutput("");
  };

  const resetProgress = () => {
    localStorage.clear();
    setCompletedChallenges([]);
    setPoints(0);
    switchChallenge(0);
    setOutput("Progress has been reset.");
  };

  const getBadge = (p) => {
    if (p >= 40) return "🥇 Gold Badge";
    if (p >= 20) return "🥈 Silver Badge";
    if (p >= 10) return "🥉 Bronze Badge";
    return "🔒 No Badge Yet";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        points={points}
        badge={getBadge(points)}
        completed={completedChallenges.length}
        total={challenges.length}
      />
      <ChallengeSelector
        challenges={challenges}
        currentChallenge={currentChallenge}
        switchChallenge={switchChallenge}
        completedChallenges={completedChallenges}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChallengeInfo challenge={challenge} />
          <Actions
            onRun={runCode}
            onReset={resetProgress}
            isRunning={isRunning}
          />
          <OutputConsole output={output} />
        </motion.div>

        <motion.div
          className="h-[400px] lg:h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CodeEditor code={code} setCode={setCode} />
        </motion.div>
      </div>
    </div>
  );
}

export default Playground;