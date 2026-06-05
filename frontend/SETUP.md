# AI Resume Analyzer - Frontend Setup Guide

A premium AI-powered resume analysis tool built with Next.js, React, TypeScript, and Framer Motion.

## Features

- **Drag & Drop File Upload**: Easy resume upload (PDF, TXT, DOC, DOCX)
- **Job Description Input**: Paste job descriptions to compare
- **ATS Score Analysis**: Circular progress indicator showing ATS compatibility
- **Skill Matching**: Visual display of found vs missing skills
- **Improvement Suggestions**: AI-powered actionable recommendations
- **Interview Prep**: Generated interview questions with accordion interface
- **Dark Theme UI**: Premium glassmorphism design with neon accents
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Mobile-first approach with full responsiveness

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.2
- **Animations**: Framer Motion 12.40.0
- **HTTP Client**: Axios 1.17.0
- **Icons**: Lucide React
- **Font**: Geist (sans & mono)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles with design tokens
├── components/
│   ├── Hero.tsx            # Landing hero section
│   ├── FileUpload.tsx      # Resume file upload with drag-drop
│   ├── JobDescription.tsx  # Job description textarea
│   ├── AnalyzeButton.tsx   # Call-to-action button with loading state
│   ├── Results.tsx         # Results container
│   ├── ATSScore.tsx        # ATS score with circular progress
│   ├── SkillsCard.tsx      # Skills matching display
│   ├── SuggestionsCard.tsx # Improvement suggestions list
│   └── InterviewQuestions.tsx # Expandable interview questions
├── lib/
│   ├── api.ts              # Axios instance and API calls
│   ├── useAnalyzer.ts      # Custom hook for analysis state
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Environment Variables

To connect to your FastAPI backend, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

The app defaults to `http://localhost:8000/api` if not set.

## Running Locally

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The frontend expects your FastAPI backend to provide an `/api/analyze` endpoint that:

### POST `/api/analyze`

**Request:**
- Form data with:
  - `resume`: File (PDF, TXT, DOC, DOCX)
  - `job_description`: String

**Response:**
```json
{
  "ats_score": 85,
  "ats_feedback": "Your resume matches the job well...",
  "skills_found": ["Python", "React", "Node.js"],
  "missing_skills": ["Docker", "Kubernetes"],
  "suggestions": [
    "Add quantifiable achievements to your experience",
    "Include more technical keywords..."
  ],
  "interview_questions": [
    "Tell us about a project...",
    "How do you approach..."
  ]
}
```

## Design System

**Color Palette:**
- **Background**: Deep black (`oklch(0.08 0 0)`)
- **Primary**: Neon blue (`oklch(0.48 0.23 264.376)`)
- **Accent**: Purple (`oklch(0.55 0.21 292.315)`)
- **Foreground**: White (`oklch(0.98 0 0)`)
- **Muted**: Gray (`oklch(0.65 0 0)`)

**Key Features:**
- Glassmorphism with backdrop blur
- Gradient accents on interactive elements
- Smooth staggered animations
- Accessible color contrast ratios
- Mobile-first responsive layout

## Performance

The app uses:
- Code splitting via Next.js dynamic imports
- Optimized animations with Framer Motion
- Efficient re-renders with React hooks
- CSS containment for better performance

## Next Steps

1. Deploy to Vercel: `vercel deploy`
2. Update `NEXT_PUBLIC_API_URL` in Vercel environment variables
3. Connect your FastAPI backend
4. Test the full analysis workflow
