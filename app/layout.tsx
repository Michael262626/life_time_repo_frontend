// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '../store/ReduxProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Life time App',
  description: "Add account holder's"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
