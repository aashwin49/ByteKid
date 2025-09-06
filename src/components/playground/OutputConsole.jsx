import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function OutputConsole({ output }) {
    const formatOutput = (line) => {
        if (line.startsWith('✅')) {
            return <span className="text-green-400">{line}</span>;
        }
        if (line.startsWith('❌') || line.startsWith('Error:')) {
            return <span className="text-red-400">{line}</span>;
        }
        return <span className="text-gray-300">{line}</span>;
    };

  return (
    <div className="rounded-lg bg-black/50 border border-gray-700 mt-6">
       <div className="flex items-center gap-2 p-3 bg-gray-800 border-b border-gray-700">
        <Terminal className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-300">Output</h3>
      </div>
      <AnimatePresence>
        {output && (
             <motion.pre 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 text-sm font-mono whitespace-pre-wrap"
            >
                {output.split('\n').map((line, i) => (
                    <div key={i}>{formatOutput(line)}</div>
                ))}
            </motion.pre>
        )}
      </AnimatePresence>
       {!output && (
           <div className="p-4 text-sm text-gray-500 italic">Run tests to see the output here.</div>
       )}
    </div>
  );
}