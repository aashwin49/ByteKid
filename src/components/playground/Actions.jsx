import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCw } from 'lucide-react';

export default function Actions({ onRun, onReset, isRunning }) {
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      onReset();
    }
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <motion.button
        onClick={onRun}
        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold shadow-lg"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        disabled={isRunning}
      >
        <Play className="w-5 h-5" />
        Run Tests
      </motion.button>
      <motion.button
        onClick={handleReset}
        className="flex items-center gap-2 px-4 py-2 bg-transparent text-red-500 rounded-lg font-medium hover:bg-red-500/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCw className="w-4 h-4" />
        Reset Progress
      </motion.button>
    </div>
  );
}