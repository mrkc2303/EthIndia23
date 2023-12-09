
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Dextr Exchange',
  description: 'A web3 protocol that enables peer-to-peer exchange of digital assets using Account Abstraction and SBTs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/svg+xml" href="/companylogo.svg" />
      <Script src="https://cdn.pagesense.io/js/brainchain/f56e5f0b854a40d4a059d58ef7165b61.js"></Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
