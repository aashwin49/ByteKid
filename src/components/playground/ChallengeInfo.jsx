import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen } from 'lucide-react';

export default function ChallengeInfo({ challenge }) {
  return (
    <motion.div
      key={challenge.title}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg bg-gray-800/50 border border-gray-700 mb-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <Target className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
      </div>
      <div className="flex items-start gap-3 text-gray-400">
        <BookOpen className="w-5 h-5 mt-1 flex-shrink-0"/>
        <p>{challenge.description}</p>
      </div>
    </motion.div>
  );
}