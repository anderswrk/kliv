import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LocalizedLink } from './LocalizedLink';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sv', name: 'Svenska' },
    { code: 'ja', name: '日本語' },
  ];

  const navigation = [
    { name: t('nav.howItWorks'), href: '#how-it-works' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.pricing'), href: '/pricing' },
  ];

  const handleAnchorClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      const isOnHomePage = location.pathname === `/${lang}` || location.pathname === '/';
      if (!isOnHomePage) {
        e.preventDefault();
        navigate(`/${lang || 'en'}${href}`);
      }
    }
  };

  const handleLanguageChange = (newLang: string) => {
    const currentPath = location.pathname;
    const currentLang = lang || 'en';
    
    // Replace current language in path with new language
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    
    navigate(newPath + location.search, { replace: true });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <LocalizedLink 
              to="/" 
              className="text-2xl font-bold text-gradient"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Kliv
            </LocalizedLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(item.href, e)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <LocalizedLink
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </LocalizedLink>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={i18n.language === language.code ? 'bg-accent' : ''}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Auth Buttons */}
            <Button variant="ghost" size="sm" asChild>
              <LocalizedLink to="/login">{t('nav.signIn')}</LocalizedLink>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <LocalizedLink to="/signup">{t('nav.getStarted')}</LocalizedLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleAnchorClick(item.href, e);
                      setMobileMenuOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ) : (
                  <LocalizedLink
                    key={item.name}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </LocalizedLink>
                )
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Globe className="h-4 w-4 mr-2" />
                        {languages.find(language => language.code === i18n.language)?.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-popover">
                      {languages.map((language) => (
                        <DropdownMenuItem
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className={i18n.language === language.code ? 'bg-accent' : ''}
                        >
                          {language.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <LocalizedLink to="/login">{t('nav.signIn')}</LocalizedLink>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <LocalizedLink to="/signup">{t('nav.getStarted')}</LocalizedLink>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}