import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ChallengeSelector({ challenges, currentChallenge, switchChallenge, completedChallenges }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-300">Select a Challenge</h3>
      <div className="flex flex-wrap gap-3">
        {challenges.map((ch, index) => (
          <motion.button
            key={index}
            onClick={() => switchChallenge(index)}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200 flex items-center gap-2 border ${
              currentChallenge === index
                ? "bg-blue-500 text-white border-blue-400"
                : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {completedChallenges.includes(index) ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <span className="w-5 h-5 text-sm font-mono text-center text-gray-500">{index + 1}</span>
            )}
            {ch.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
}