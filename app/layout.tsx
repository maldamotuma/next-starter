// "use client"

import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import 'keen-slider/keen-slider.min.css'
import WholeWrapper from '@/components/wrappers/wholeWrapper'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import 'simplebar-react/dist/simplebar.min.css';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import ReduxWrapper from '@/redux/wrapper'
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin',
  metadataBase: new URL("https://admin.tech-scan.com")
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
      // className={inter.className}
      >
        <ReduxWrapper>
          <WholeWrapper>
            {children}
          </WholeWrapper>
        </ReduxWrapper>
      </body>
    </html>
  )
}
