import { createContext, type ReactNode, useContext, useMemo, useState } from 'react'

import { translations, type Copy, type Language } from '@/data/content'

type LanguageContextValue = {
  copy: Copy
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const storageKey = 'aashray-buildcon-language'

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(storageKey) === 'gu' ? 'gu' : 'en'
}

/** Provides the selected language and remembers it in the web browser. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage)
  const value = useMemo<LanguageContextValue>(
    () => ({
      copy: translations[language],
      language,
      setLanguage: (nextLanguage) => {
        updateLanguage(nextLanguage)
        if (typeof window !== 'undefined') window.localStorage.setItem(storageKey, nextLanguage)
      },
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
