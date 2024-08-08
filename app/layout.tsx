import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from 'next/font/google'

import './globals.css'
import Provider from '@/app/Provider'
import { cn } from '@/lib/utils'
import { dark } from '@clerk/themes'
import type { ReactNode } from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Livedocs',
  description: 'Your go-to collaborative editor'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#3371FF', fontSize: '16px' }
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
