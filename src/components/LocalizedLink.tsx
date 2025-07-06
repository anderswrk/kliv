import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  lang?: string;
}

export function LocalizedLink({ to, lang, ...props }: LocalizedLinkProps) {
  const { lang: currentLang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  
  const targetLang = lang || currentLang || i18n.language || 'en';
  
  // Don't add language prefix if it's already there
  const localizedTo = to.startsWith(`/${targetLang}/`) || to === `/${targetLang}` 
    ? to 
    : `/${targetLang}${to === '/' ? '' : to}`;

  return <RouterLink to={localizedTo} {...props} />;
}