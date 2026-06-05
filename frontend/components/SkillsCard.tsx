'use client';

import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface SkillsCardProps {
  skillsFound: string[];
  missingSkills: string[];
}

export function SkillsCard({ skillsFound = [], missingSkills = [] }: SkillsCardProps) {
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-8"
    >
      {/* Skills Found */}
      <div className="bg-gradient-to-br from-background to-primary/10 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Skills Found</h3>
        </div>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillsFound.length > 0 ? (
            skillsFound.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full text-green-300 text-sm font-medium"
              >
                {skill}
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground">No matching skills found</p>
          )}
        </motion.div>
      </div>

      {/* Missing Skills */}
      <div className="bg-gradient-to-br from-background to-accent/10 border border-accent/20 rounded-3xl p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Skills to Develop</h3>
        </div>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium"
              >
                {skill}
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground">All skills match!</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
