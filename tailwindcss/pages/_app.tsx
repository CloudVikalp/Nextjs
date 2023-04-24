import Siderbar from '@/components/Siderbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <Siderbar>
    <Component {...pageProps} />
  </Siderbar>
  )
}
