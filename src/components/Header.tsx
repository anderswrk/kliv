import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sv', name: 'Svenska' },
    { code: 'ja', name: '日本語' },
  ];

  const navigation = [
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient">
              Kliv
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
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
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={i18n.language === lang.code ? 'bg-accent' : ''}
                  >
                    {lang.name}
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
              <Link to="/login">{t('nav.signIn')}</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link to="/signup">{t('nav.getStarted')}</Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Globe className="h-4 w-4 mr-2" />
                        {languages.find(lang => lang.code === i18n.language)?.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-popover">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={i18n.language === lang.code ? 'bg-accent' : ''}
                        >
                          {lang.name}
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
                  <Link to="/login">{t('nav.signIn')}</Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/signup">{t('nav.getStarted')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}