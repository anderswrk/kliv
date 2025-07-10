import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  lang: string;
}

export function Breadcrumb({ items, lang }: BreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link
              to={`/${lang}/inspiration`}
              className="flex items-center hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              {t('breadcrumb.allInspiration', 'All Inspiration')}
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/60" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}