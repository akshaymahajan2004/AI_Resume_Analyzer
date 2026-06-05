'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface SuggestionsCardProps {
  suggestions: string[];
}

export function SuggestionsCard({ suggestions = [] }: SuggestionsCardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-background to-primary/10 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Improvement Suggestions</h3>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:border-primary/40 transition-all"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <p className="text-foreground flex-1 leading-relaxed">{suggestion}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-muted-foreground">No suggestions at this time</p>
        )}
      </motion.div>
    </motion.div>
  );
}
