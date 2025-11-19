/**
 * Cookie utility functions for language detection
 */

export const LANGUAGE_COOKIE_NAME = 'kliv_lang';
export const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Get language from cookie
 */
export function getLanguageFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === LANGUAGE_COOKIE_NAME) {
      return value || null;
    }
  }
  return null;
}

/**
 * Set language cookie
 */
export function setLanguageCookie(language: string): void {
  if (typeof document === 'undefined') return;
  
  const maxAge = COOKIE_MAX_AGE;
  const path = '/';
  
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; path=${path}; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Convert various language formats to our supported format
 * e.g., 'ja-JP' -> 'ja', 'en-US' -> 'en', 'sv-SE' -> 'sv'
 */
export function normalizeLanguageCode(lang: string): string {
  return lang.split('-')[0];
}