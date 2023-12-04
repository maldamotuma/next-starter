// "use client"

import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import 'keen-slider/keen-slider.min.css'
import WholeWrapper from '@/components/wrappers/wholeWrapper'
import 'simplebar-react/dist/simplebar.min.css';
import FloatingContact from '@/components/contact'
import ReduxWrapper from '@/redux/wrapper'
import { app_url } from '@/config/variables';


// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Tech-Scan | Navigating AI and Full-stack Development Insights for Tech Enthusiasts and Innovators",
    template: "%s | Tech-Scan"
  },
  description: 'Discover the latest trends and insights in FullStack development, including Nextjs, Laravel, Python, and AI technologies like machine learning and deep learning, on our blog website.',
  applicationName: "Tech-Scan",
  referrer: 'origin-when-cross-origin',
  keywords: ["AI", "Full-stack development", "Technology Insights", "Innovation", "Tech Enthusiasts", "Digital Landscape", "React", "Next.js", "Laravel", "Python", "Machine Learning", "Deep Learning"],
  authors: [{ name: "Malda Motuma" }],
  creator: "Malda Motuma",
  publisher: "Malda Motuma",
  metadataBase: new URL(app_url)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body
      // className={inter.className}
      >
        <ReduxWrapper>
          <WholeWrapper>
            <FloatingContact />
            {children}
          </WholeWrapper>
        </ReduxWrapper>
      </body>
    </html>
  )
}
