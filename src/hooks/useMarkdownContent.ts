
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useMarkdownContent(contentType: 'terms' | 'privacy' | 'security') {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get the current language, fallback to 'en' if not available
        let language = i18n.language;
        
        // Handle language codes like 'en-US' by taking only the first part
        if (language && language.includes('-')) {
          language = language.split('-')[0];
        }
        
        // Ensure we have a valid language code
        if (!language || !['en', 'sv', 'ja'].includes(language)) {
          language = 'en';
        }
        
        try {
          // Try to load the content for the current language
          const response = await fetch(`/content/docs/${contentType}/${language}.md`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const content = await response.text();
          setContent(content);
        } catch (langError) {
          console.warn(`Failed to load ${contentType} content for language ${language}, falling back to English`);
          // Fallback to English if the language file doesn't exist
          try {
            const fallbackResponse = await fetch(`/content/docs/${contentType}/en.md`);
            if (!fallbackResponse.ok) {
              throw new Error(`HTTP error! status: ${fallbackResponse.status}`);
            }
            const fallbackContent = await fallbackResponse.text();
            setContent(fallbackContent);
          } catch (fallbackError) {
            throw new Error(`Failed to load ${contentType} content for both ${language} and English`);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error(`Error loading ${contentType} content:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentType, i18n.language]);

  return { content, loading, error };
}
