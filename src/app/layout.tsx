import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import ReactQueryProvider from '@/context/app/ReactQueryProvider'

const nanum = localFont({
  variable: '--font-nanum',
  preload: true,
  fallback: ['sans-serif'],
  src: [
    {
      path: '../assets/fonts/NanumBarunGothicUltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumBarunGothicLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumBarunGothic.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumBarunGothicBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={nanum.variable}>
      <ReactQueryProvider>
        <body>
          {children}
          <div id="modal-root"></div>
        </body>
      </ReactQueryProvider>
    </html>
  )
}
