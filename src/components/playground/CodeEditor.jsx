import React from 'react';
import { Code } from 'lucide-react';

export default function CodeEditor({ code, setCode }) {
  return (
    <div className="rounded-lg bg-gray-800/50 border border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 bg-gray-800 border-b border-gray-700">
        <Code className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-300">Your Code</h3>
      </div>
      <div className="flex-grow">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm resize-none border-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
}