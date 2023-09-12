import React from 'react'

import { cn } from '@/lib/cn'
import { Inter } from 'next/font/google'

import { RootLayoutFooter } from './(layout)/footer'
import { RootLayoutHeader } from './(layout)/header'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={cn([inter.className])} lang="pt-br">
      <body className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <RootLayoutHeader />
        <main>{children}</main>
        <RootLayoutFooter />
      </body>
    </html>
  )
}