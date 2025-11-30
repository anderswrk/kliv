import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SpotlightCard from '@/components/SpotlightCard';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { useUserSession } from '../hooks/useUserSession';

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { isLoggedIn, goToPortal } = useUserSession();
  const [message, setMessage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get localized typing examples
  const typingExamples = t('hero.typingExamples', { returnObjects: true }) as string[];
  
  const { displayText, stopAnimation, startAnimation, isActive } = useTypingAnimation({
    texts: typingExamples,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2000,
    loop: true
  });

  const examples = [
    {
      short: t('hero.examples.todo'),
      full: t('hero.examples.todoFull')
    },
    {
      short: t('hero.examples.dashboard'),
      full: t('hero.examples.dashboardFull')
    },
    {
      short: t('hero.examples.blog'),
      full: t('hero.examples.blogFull')
    }
  ];
const handleStartBuilding = () => {
    // Check if user is logged in
    if (isLoggedIn) {
      // User is logged in, go to portal with prompt in URL
      goToPortal(message.trim());
    } else {
      // User is not logged in, navigate to signup page with the prompt as a URL parameter
      const currentLang = lang || 'en';
      const params = new URLSearchParams();
      if (message.trim()) {
        params.set('prompt', message.trim());
      }
      
      const queryString = params.toString();
      const url = queryString ? `/${currentLang}/signup?${queryString}` : `/${currentLang}/signup`;
      
      navigate(url);
    }
  };

  const handleExampleClick = (example: { short: string; full: string }) => {
    setMessage(example.full);
    stopAnimation();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    stopAnimation();
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (!message.trim()) {
      startAnimation();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.value.trim() && isActive) {
      stopAnimation();
    } else if (!e.target.value.trim() && !isInputFocused) {
      startAnimation();
    }
  };

  // Determine what to show as placeholder
  const getPlaceholder = () => {
    if (isInputFocused || message.trim()) {
      return t('hero.placeholder');
    }
    // Only show default placeholder if animation is completely inactive
    // Otherwise show the animated text (even if empty during deletion)
    if (!isActive) {
      return t('hero.placeholder');
    }
    return displayText || '';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,119,255,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,107,107,0.08),transparent_50%)]" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-10 animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {t('hero.badge')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in leading-[1.1]">
            <span className="text-gradient" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Main Message Input */}
          <SpotlightCard 
            className="p-10 mb-8 animate-scale-in"
            spotlightColor="255, 200, 100"
            spotlightColor2="255, 140, 80"
            lightSpotlightColor="255, 180, 70"
            lightSpotlightColor2="255, 120, 60"
            spotlightSize={550}
            spotlightOpacity={0.18}
            spotlightOpacityLight={0.6}
            spotlightOverflow={true}
            alwaysOn={true}
            dualSpotlights={true}
            animationSpeed={1560}
            animationSpeed2={1950}
          >
            <div className="space-y-6">
              {/* Input Label */}
              <div className="flex items-center gap-2 text-left">
                <MessageSquare className="h-5 w-5 text-primary" />
                <label className="text-base font-semibold text-foreground">
                  {t('hero.inputLabel')}
                </label>
              </div>
              
              {/* Text Input */}
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  placeholder={getPlaceholder()}
                  value={message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="min-h-[160px] text-lg resize-none border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 p-5"
                />
                {message.length > 0 && (
                  <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 dark:bg-background/60 px-2 py-1 rounded">
                    {message.length} {t('hero.charactersCount')}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t('hero.examples.label')}
                  </span>
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="text-sm font-medium text-primary hover:text-accent underline underline-offset-2 transition-colors px-3 py-1.5 rounded-full hover:bg-primary/10"
                    >
                      {example.short}
                    </button>
                  ))}
                </div>
                
                <Button
                  onClick={handleStartBuilding}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 min-w-[180px] text-base font-semibold px-8 py-6"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}