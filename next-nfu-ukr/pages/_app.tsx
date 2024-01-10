import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'
import { Analytics } from '@vercel/analytics/react'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <MoralisProvider initializeOnMount={false}>
        <Component {...pageProps} />
        <Analytics />
      </MoralisProvider>
    </NotificationProvider>
  )
}
