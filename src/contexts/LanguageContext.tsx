import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { LangCode, t as translate, TranslationKey } from '@/i18n/translations'

interface LanguageContextType {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang)
  }, [])

  const tFn = useCallback((key: TranslationKey) => translate(lang, key), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
