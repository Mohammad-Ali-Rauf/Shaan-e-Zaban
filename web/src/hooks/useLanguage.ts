'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, languages } from '@/lib/languages';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: any;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ 
        language: lang,
        t: languages[lang]
      }),
      toggleLanguage: () => {
        const currentLang = get().language;
        const newLang = currentLang === 'en' ? 'ur' : 'en';
        set({ 
          language: newLang,
          t: languages[newLang]
        });
      },
      t: languages['en'] // default
    }),
    {
      name: 'language-storage',
    }
  )
);

// Hook to get translations
export const useTranslations = () => {
  const t = useLanguage(state => state.t);
  return t;
};

// Hook to get language actions
export const useLanguageActions = () => {
  const setLanguage = useLanguage(state => state.setLanguage);
  const toggleLanguage = useLanguage(state => state.toggleLanguage);
  const language = useLanguage(state => state.language);
  
  return { setLanguage, toggleLanguage, language };
};