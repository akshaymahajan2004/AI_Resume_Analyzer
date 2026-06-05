'use client';

import { motion } from 'framer-motion';

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function JobDescription({
  value,
  onChange,
  disabled = false,
}: JobDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-foreground">
          Job Description
        </label>

        <div className="relative group">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Paste the job description here. Include key responsibilities, required skills, and qualifications..."
            className="w-full h-48 p-4 bg-primary/5 border border-primary/30 rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          />

          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-focus-within:opacity-20 transition-opacity pointer-events-none blur" />
        </div>

        <div className="text-xs text-muted-foreground">
          {value.length} characters
        </div>
      </div>
    </motion.div>
  );
}
