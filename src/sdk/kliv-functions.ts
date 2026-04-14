import functions from '@/sdk/kliv-functions';

// Type definitions for function responses
export interface LandingPageResponse {
  url: string;
  page_slug: string;
  title: string;
  description: string;
  defaultPrompt: string;
  metaDescription: string;
  'hero.title': string;
  'hero.subtitle': string;
  'hero.cta': string;
  sections: any[];
  category_name: string;
  category_slug: string;
}

export default functions;