import { useState, useEffect, useRef, useCallback } from 'react';

interface TypingAnimationOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export const useTypingAnimation = ({
  texts,
  typingSpeed = 30, // Made even faster
  deletingSpeed = 15, // Made even faster
  pauseDuration = 2000,
  loop = true
}: TypingAnimationOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const stopAnimation = useCallback(() => {
    setIsActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const startAnimation = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive || texts.length === 0) {
      return;
    }

    const currentText = texts[currentTextIndex];
    const textWithEllipsis = currentText + '...';

    const tick = () => {
      if (isDeleting) {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      } else {
        // Typing phase
        if (displayText.length < textWithEllipsis.length) {
          setDisplayText(prev => textWithEllipsis.slice(0, prev.length + 1));
          timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, pauseDuration);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 25);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentTextIndex, isDeleting, isActive, texts, typingSpeed, deletingSpeed, pauseDuration]);

  // Clear text when animation stops
  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
    }
  }, [isActive]);

  return {
    displayText,
    stopAnimation,
    startAnimation,
    isActive
  };
};