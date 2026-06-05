'use client';

import { motion } from 'framer-motion';
import { AnalyzerResponse } from '@/lib/api';
import { ATSScore } from './ATSScore';
import { SkillsCard } from './SkillsCard';
import { SuggestionsCard } from './SuggestionsCard';
import { InterviewQuestions } from './InterviewQuestions';

interface ResultsProps {
  data: AnalyzerResponse;
  onReset: () => void;
}

export function Results({ data, onReset }: ResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Analysis Results
          </h2>
          <p className="text-muted-foreground mt-2">
            Detailed insights to optimize your resume
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-6 py-2 bg-primary/10 border border-primary/30 hover:border-primary/50 rounded-lg text-primary font-medium transition-all"
        >
          Analyze Another Resume
        </motion.button>
      </div>

      {/* ATS Score */}
      <ATSScore score={data.ats_score} feedback={data.ats_feedback} />

      {/* Skills */}
      <SkillsCard
        skillsFound={data.skills_found}
        missingSkills={data.missing_skills}
      />

      {/* Suggestions */}
      <SuggestionsCard suggestions={data.suggestions} />

      {/* Interview Questions */}
      <InterviewQuestions questions={data.interview_questions} />
    </motion.div>
  );
}
