import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    // Navigate to the signup page with the prompt as a URL parameter
    const params = new URLSearchParams();
    if (message.trim()) {
      params.set('prompt', message.trim());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/signup?${queryString}` : '/signup';
    
    navigate(url);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-indigo-500/5" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t('hero.badge')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            {t('hero.subtitle')}
          </p>

          {/* Main Message Input */}
          <Card className="p-8 mb-8 bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl animate-scale-in rounded">
            <div className="space-y-6">
              {/* Input Label */}
              <div className="flex items-center gap-2 text-left">
                <MessageSquare className="h-5 w-5 text-primary" />
                <label className="text-sm font-medium text-foreground">
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
                  className="min-h-[140px] text-lg resize-none border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded p-4"
                />
                {message.length > 0 && (
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {message.length} {t('hero.charactersCount')}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">
                    {t('hero.examples.label')}
                  </span>
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors px-2 py-1 rounded hover:bg-primary/5"
                    >
                      {example.short}
                    </button>
                  ))}
                </div>
                
                <Button
                  onClick={handleStartBuilding}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}