import { Language, LanguageStrings } from './types';
import { en } from './en';
import { ur } from './ur';

export const languages: Record<Language, LanguageStrings> = {
  en,
  ur
};

export function getTranslations(lang: Language = 'en'): LanguageStrings {
  return languages[lang] || languages.en;
}

// Export everything properly
export { 
  type Language, 
  type LanguageStrings, 
};

// Server-side translation helper
export function getServerTranslations(lang: Language = 'en') {
  return languages[lang] || languages.en;
}