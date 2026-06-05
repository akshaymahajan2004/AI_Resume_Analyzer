'use client';

import { useState } from 'react';
import { analyzeResume, AnalyzerResponse } from './api';

interface UseAnalyzerState {
  isLoading: boolean;
  error: string | null;
  results: AnalyzerResponse | null;
}

export const useAnalyzer = () => {
  const [state, setState] = useState<UseAnalyzerState>({
    isLoading: false,
    error: null,
    results: null,
  });

  const analyze = async (resumeFile: File, jobDescription: string) => {
    setState({ isLoading: true, error: null, results: null });

    try {
      const results = await analyzeResume(resumeFile, jobDescription);
      setState({ isLoading: false, error: null, results });
      return results;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during analysis';
      setState({ isLoading: false, error: errorMessage, results: null });
      throw err;
    }
  };

  const reset = () => {
    setState({ isLoading: false, error: null, results: null });
  };

  return {
    ...state,
    analyze,
    reset,
  };
};
