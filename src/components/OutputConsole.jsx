export default function OutputConsole({ output }) {
  const formatLine = (line) => {
    if (line.startsWith("✅")) return <span className="text-green-400">{line}</span>;
    if (line.startsWith("❌") || line.startsWith("Error:"))
      return <span className="text-red-400">{line}</span>;
    return <span className="text-gray-300">{line}</span>;
  };

  return (
    <div className="rounded-lg bg-black text-white mt-4 p-4">
      <h3 className="font-bold mb-2">Console Output</h3>
      {output ? (
        output.split("\n").map((line, i) => <div key={i}>{formatLine(line)}</div>)
      ) : (
        <p className="text-gray-400 italic">Run tests to see the output here.</p>
      )}
    </div>
  );
}