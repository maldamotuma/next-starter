"use client"

import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import 'keen-slider/keen-slider.min.css'
import WholeWrapper from '@/components/wrappers/wholeWrapper'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import 'simplebar-react/dist/simplebar.min.css';


// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

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
        <SessionProvider>
          <Provider store={store}>
            <WholeWrapper>
              {children}
            </WholeWrapper>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
