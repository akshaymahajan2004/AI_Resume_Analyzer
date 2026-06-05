'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnalyzeButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function AnalyzeButton({
  onClick,
  isLoading,
  disabled = false,
}: AnalyzeButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center"
    >
      <button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="relative group px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 group-hover:bg-right transition-all duration-500" />

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Content */}
        <div className="relative flex items-center gap-3 justify-center">
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span>Analyzing your resume...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>Analyze Resume</span>
            </>
          )}
        </div>
      </button>
    </motion.div>
  );
}
