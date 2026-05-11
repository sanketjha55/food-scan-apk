// Localization configuration
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

// Import language files
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import esTranslations from '../locales/es.json';

// Set the key-value pairs for the different languages you want to support
i18n.translations = {
  en: enTranslations,
  hi: hiTranslations,
  es: esTranslations,
  // Add more languages as needed
};

// Set the locale once at the beginning of your app
i18n.locale = Localization.locale || 'en';
i18n.fallbacks = { 'en-*': 'en', 'hi-*': 'hi', 'es-*': 'es' };
i18n.enableFallback = true;

// All supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
];

// All supported regions
export const SUPPORTED_REGIONS = [
  { code: 'US', name: 'United States', country: 'USA' },
  { code: 'IN', name: 'India', country: 'India' },
  { code: 'UK', name: 'United Kingdom', country: 'UK' },
  { code: 'CA', name: 'Canada', country: 'Canada' },
  { code: 'AU', name: 'Australia', country: 'Australia' },
  { code: 'ES', name: 'Spain', country: 'Spain' },
  { code: 'FR', name: 'France', country: 'France' },
  { code: 'DE', name: 'Germany', country: 'Germany' },
  { code: 'IT', name: 'Italy', country: 'Italy' },
  { code: 'BR', name: 'Brazil', country: 'Brazil' },
  { code: 'MX', name: 'Mexico', country: 'Mexico' },
  { code: 'JP', name: 'Japan', country: 'Japan' },
  { code: 'CN', name: 'China', country: 'China' },
  { code: 'KR', name: 'South Korea', country: 'South Korea' },
  { code: 'SG', name: 'Singapore', country: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates', country: 'UAE' },
  { code: 'SA', name: 'Saudi Arabia', country: 'Saudi Arabia' },
  { code: 'ZA', name: 'South Africa', country: 'South Africa' },
  { code: 'NG', name: 'Nigeria', country: 'Nigeria' },
  { code: 'PH', name: 'Philippines', country: 'Philippines' },
];

export function setLanguage(languageCode) {
  i18n.locale = languageCode;
}

export function getLanguage() {
  return i18n.locale;
}

export function translate(key, params) {
  return i18n.t(key, params);
}

export default i18n;
