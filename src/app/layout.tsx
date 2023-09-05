import type { Metadata } from 'next'

import TopNavBar from '@/components/topNavBar'
import QueryWrapper from '@/components/queryWrapper'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Crypto Calculator',
  description: 'Effortlessly allocate your cryptocurrency investments with our easy-to-use calculator.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        <QueryWrapper>
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
