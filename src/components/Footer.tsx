
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { name: t('footer.features'), href: '/features' },
        { name: t('footer.pricing'), href: '/pricing' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.about'), href: '/about' },
        { name: t('footer.careers'), href: '/careers' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.contact'), href: '#contact' },
        { name: t('footer.serviceStatus'), href: 'https://kliv.freshstatus.io/' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.privacy'), href: '/privacy' },
        { name: t('footer.terms'), href: '/terms' },
        { name: t('footer.security'), href: '/security' },
      ],
    },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="text-2xl font-bold text-gradient mb-4">
              Kliv
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            This website built by Kliv AI and hosted on the Kliv platform. Email us at{' '}
            <a 
              href="mailto:hello@kliv.dev" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              hello@kliv.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
