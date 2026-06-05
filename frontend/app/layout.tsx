import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Resume Analyzer - Optimize Your Resume for ATS',
  description: 'Get instant AI-powered insights on how well your resume matches job descriptions. Optimize for ATS, discover missing skills, and ace your interviews.',
  generator: 'v0.app',
  icons: {
    icon: [
      
      {
        url: '/logo.jpg',
        type: 'image/jpg',
        sizes: '16x16',
      },
      
    ]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark bg-background`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
