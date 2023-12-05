// "use client"

import type { Metadata } from 'next'
import './globals.css'
import 'keen-slider/keen-slider.min.css'
import WholeWrapper from '@/components/wrappers/wholeWrapper'
import 'simplebar-react/dist/simplebar.min.css';
import FloatingContact from '@/components/contact'
import ReduxWrapper from '@/redux/wrapper'
import { app_url } from '@/config/variables';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';



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
      <body>
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
