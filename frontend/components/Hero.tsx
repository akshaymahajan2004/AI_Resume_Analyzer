'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/50 flex items-center justify-center overflow-hidden px-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-white/5 opacity-50" />

      {/* Glow effects */}
      <div className="absolute top-1/4 -left-1/2 w-full h-full bg-accent/20 blur-3xl rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/2 w-full h-full bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-sans text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          AI Resume
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {' '}Analyzer
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Get instant AI-powered insights on how well your resume matches job
          descriptions. Optimize for ATS, discover missing skills, and ace your
          interviews.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-accent">
            <span className="flex h-3 w-3 rounded-full bg-accent animate-pulse" />
            <span className="text-sm md:text-base font-medium">
              Free analysis for your career growth
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
