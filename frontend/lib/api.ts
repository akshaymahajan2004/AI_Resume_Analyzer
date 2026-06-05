import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface AnalyzerResponse {
  ats_score: number;
  ats_feedback: string;
  skills_found: string[];
  missing_skills: string[];
  suggestions: string[];
  interview_questions: string[];
}

export const analyzeResume = async (
  resumeFile: File,
  jobDescription: string
): Promise<AnalyzerResponse> => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('job_description', jobDescription);

  const response = await api.post<AnalyzerResponse>('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default api;
