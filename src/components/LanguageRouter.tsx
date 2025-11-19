import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromCookie, getLanguageCode, setLanguageCookie, getFullLocale } from '../utils/cookieUtils';

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
    // If no language in URL, detect from cookie first, then browser
    if (!lang) {
      let detectedLang = defaultLanguage;
      
      // Check for 'lang' cookie first
      const cookieLocale = getLanguageFromCookie();
      if (cookieLocale) {
        // Extract language code from locale (e.g., 'en-US' -> 'en')
        const cookieLang = getLanguageCode(cookieLocale);
        if (supportedLanguages.includes(cookieLang)) {
          detectedLang = cookieLang;
        }
      } else {
        // Fallback to browser language preference
        const browserLang = navigator.language.split('-')[0];
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

    // Set the 'lang' cookie when language is determined from URL
    setLanguageCookie(getFullLocale(lang));

    // Change i18n language if it doesn't match URL
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate, location]);

  return <>{children}</>;
}