/**
 * Cookie utility functions
 */

/**
 * Get language from the 'lang' cookie
 * Returns the full locale code (e.g., 'en-US', 'ja-JP')
 */
export function getLanguageFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'lang') {
      return value || null;
    }
  }
  return null;
}

/**
 * Set the 'lang' cookie with full locale code
 * @param locale - Full locale code (e.g., 'en-US', 'ja-JP', 'sv-SE')
 */
export function setLanguageCookie(locale: string): void {
  if (typeof document === 'undefined') return;
  
  const maxAge = 365 * 24 * 60 * 60; // 1 year
  const path = '/';
  
  // Extract root domain (e.g., 'kliv.dev' from 'subdomain.kliv.dev')
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const domain = parts.length >= 2 ? `.${parts.slice(-2).join('.')}` : hostname;
  
  // Clear any existing lang cookies with different domain settings
  document.cookie = `lang=; path=${path}; max-age=0`;
  document.cookie = `lang=; path=${path}; max-age=0; domain=${domain}`;
  document.cookie = `lang=; path=${path}; max-age=0; domain=${hostname}`;
  
  // Set the new cookie with root domain
  document.cookie = `lang=${locale}; path=${path}; max-age=${maxAge}; domain=${domain}`;
  
  console.log('cookieUtils: Set lang cookie:', locale, 'domain:', domain, '| Result:', document.cookie);
}

/**
 * Extract language code from full locale
 * e.g., 'en-US' -> 'en', 'ja-JP' -> 'ja'
 */
export function getLanguageCode(locale: string): string {
  return locale.split('-')[0];
}

/**
 * Map our supported language codes to full locale codes
 */
export function getFullLocale(langCode: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'sv': 'sv-SE',
    'ja': 'ja-JP'
  };
  return localeMap[langCode] || 'en-US';
}