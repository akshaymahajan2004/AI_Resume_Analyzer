'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { FileUpload } from '@/components/FileUpload';
import { JobDescription } from '@/components/JobDescription';
import { AnalyzeButton } from '@/components/AnalyzeButton';
import { Results } from '@/components/Results';
import { useAnalyzer } from '@/lib/useAnalyzer';

export default function Page() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const { isLoading, error, results, analyze, reset } = useAnalyzer();

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    try {
      await analyze(resumeFile, jobDescription);
    } catch (err) {
      console.error('[v0] Analysis error:', err);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    reset();
  };

  return (
    <main className="min-h-screen bg-background">
      {!results ? (
        <>
          <Hero />
          
          <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
            <div className="space-y-12">
              {/* File Upload */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Upload Your Resume
                </h2>
                <FileUpload
                  onFileSelected={setResumeFile}
                  disabled={isLoading}
                />
                {resumeFile && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    ✓ Resume selected: {resumeFile.name}
                  </p>
                )}
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Paste Job Description
                </h2>
                <JobDescription
                  value={jobDescription}
                  onChange={setJobDescription}
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                  <p className="text-red-400 font-medium">Error: {error}</p>
                </div>
              )}

              {/* Analyze Button */}
              <div className="pt-4">
                <AnalyzeButton
                  onClick={handleAnalyze}
                  isLoading={isLoading}
                  disabled={!resumeFile || !jobDescription.trim()}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
          <Results data={results} onReset={handleReset} />
        </section>
      )}
    </main>
  );
}
