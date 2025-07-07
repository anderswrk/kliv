import { useTranslation } from 'react-i18next';
import { LocalizedLink } from './LocalizedLink';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Kliv</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t('footer.product')}
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink 
                  to="/features" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.features')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink 
                  to="/pricing" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.pricing')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink 
                  to="/inspiration" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.inspiration')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.about')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink 
                  to="/careers" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.careers')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink 
                  to="/privacy" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink 
                  to="/terms" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.terms')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink 
                  to="/security" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.security')}
                </LocalizedLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}