import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Award } from 'lucide-react';

const badgeInfo = {
  "🥇 Gold Badge": { icon: <Award className="w-6 h-6 text-yellow-400" />, color: "border-yellow-400/50 bg-yellow-400/10" },
  "🥈 Silver Badge": { icon: <Award className="w-6 h-6 text-slate-300" />, color: "border-slate-300/50 bg-slate-300/10" },
  "🥉 Bronze Badge": { icon: <Award className="w-6 h-6 text-orange-400" />, color: "border-orange-400/50 bg-orange-400/10" },
  "🔒 No Badge Yet": { icon: <Trophy className="w-6 h-6 text-gray-500" />, color: "border-gray-500/50 bg-gray-500/10" }
};

export default function Header({ points, badge, completed, total }) {
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const currentBadge = badgeInfo[badge];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center gap-4 p-4 rounded-lg border border-blue-400/50 bg-blue-400/10">
          <Star className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Points</p>
            <p className="text-2xl font-bold">{points}</p>
          </div>
        </div>
        <div className={`flex items-center justify-center gap-4 p-4 rounded-lg border ${currentBadge.color}`}>
          {currentBadge.icon}
          <div>
            <p className="text-sm text-gray-400">Current Badge</p>
            <p className="text-lg font-semibold">{badge.replace(/🔒|🥇|🥈|🥉/g, '').trim()}</p>
          </div>
        </div>
         <div className="flex items-center justify-center gap-4 p-4 rounded-lg border border-green-400/50 bg-green-400/10">
          <Trophy className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-2xl font-bold">{completed} / {total}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">{Math.round(progress)}% Complete</p>
      </div>
    </motion.div>
  );
}