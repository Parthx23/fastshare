'use client'

import './globals.css'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Important: create client only once (Next.js refresh issue)
  const [client] = useState(
    () => new ConvexReactClient("https://outstanding-rook-599.convex.cloud")
  )

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexProvider client={client}>
          {children}
        </ConvexProvider>
      </body>
    </html>
  )
}
