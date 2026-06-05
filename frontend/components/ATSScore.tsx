'use client';

import { motion } from 'framer-motion';

interface ATSScoreProps {
  score: number;
  feedback: string;
}

export function ATSScore({ score, feedback }: ATSScoreProps) {
  const scoreColor =
    score >= 80 ? 'from-green-500 to-emerald-500' :
    score >= 60 ? 'from-yellow-500 to-orange-500' :
    'from-red-500 to-pink-500';

  const scoreLabel =
    score >= 80 ? 'Excellent' :
    score >= 60 ? 'Good' :
    'Needs Improvement';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-background to-primary/10 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl"
    >
      <h3 className="text-2xl font-bold text-foreground mb-8">ATS Score</h3>

      <div className="flex flex-col items-center gap-8">
        {/* Circular progress */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${565.48 * (score / 100)} 565.48`}
              initial={{ strokeDasharray: '0 565.48' }}
              animate={{ strokeDasharray: `${565.48 * (score / 100)} 565.48` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {score}
              </p>
            </motion.div>
            <p className="text-sm text-muted-foreground mt-2">{scoreLabel}</p>
          </div>
        </div>

        {/* Feedback */}
        <div className="w-full">
          <p className="text-sm text-muted-foreground mb-2 font-medium">Feedback</p>
          <p className="text-foreground leading-relaxed text-center">{feedback}</p>
        </div>
      </div>
    </motion.div>
  );
}
