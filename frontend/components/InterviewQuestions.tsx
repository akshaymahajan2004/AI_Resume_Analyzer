'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface InterviewQuestionsProps {
  questions: string[];
}

export function InterviewQuestions({ questions = [] }: InterviewQuestionsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-background to-accent/10 border border-accent/20 rounded-3xl p-8 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Interview Prep Questions</h3>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-accent/20 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="w-full p-4 bg-accent/5 hover:bg-accent/10 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3 text-left flex-1">
                  <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-foreground font-medium line-clamp-2">
                    {question}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-2"
                >
                  <ChevronDown className="w-5 h-5 text-accent" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-background border-t border-accent/20">
                      <p className="text-foreground leading-relaxed">
                        {question}
                      </p>
                      <p className="text-sm text-muted-foreground mt-3">
                        Tip: Prepare a structured answer using the STAR method
                        (Situation, Task, Action, Result) to answer this
                        question effectively.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <p className="text-muted-foreground">No interview questions yet</p>
        )}
      </motion.div>
    </motion.div>
  );
}
