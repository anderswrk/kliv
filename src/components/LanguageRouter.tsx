import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromCookie, setLanguageCookie, normalizeLanguageCode } from '../utils/cookieUtils';

interface LanguageRouterProps {
  children: React.ReactNode;
}

export function LanguageRouter({ children }: LanguageRouterProps) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const supportedLanguages = ['en', 'sv', 'ja'];
  const defaultLanguage = 'en';

  useEffect(() => {
    // If no language in URL, detect language from cookie first, then browser
    if (!lang) {
      // Check for language cookie first
      const cookieLang = getLanguageFromCookie();
      let detectedLang = defaultLanguage;
      
      if (cookieLang) {
        // Normalize cookie language (e.g., 'ja-JP' -> 'ja')
        const normalizedCookieLang = normalizeLanguageCode(cookieLang);
        detectedLang = supportedLanguages.includes(normalizedCookieLang) ? normalizedCookieLang : defaultLanguage;
      } else {
        // Fallback to browser language preference
        const browserLang = normalizeLanguageCode(navigator.language);
        detectedLang = supportedLanguages.includes(browserLang) ? browserLang : defaultLanguage;
      }
      
      navigate(`/${detectedLang}${location.pathname}${location.search}`, { replace: true });
      return;
    }

    // If language in URL is not supported, redirect to default
    if (!supportedLanguages.includes(lang)) {
      navigate(`/${defaultLanguage}${location.pathname.replace(`/${lang}`, '')}${location.search}`, { replace: true });
      return;
    }

    // Set cookie when language is determined from URL
    setLanguageCookie(lang);

    // Change i18n language if it doesn't match URL
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate, location]);

  return <>{children}</>;
}