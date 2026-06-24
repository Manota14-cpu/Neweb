import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { LenisProvider } from '@/hooks/useLenis'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <LanguageProvider>
      <LenisProvider>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </LenisProvider>
    </LanguageProvider>
  )
}
