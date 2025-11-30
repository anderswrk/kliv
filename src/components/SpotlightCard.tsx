import React, { useRef, useState, useEffect, ReactNode } from "react";
import { useTheme } from "@/components/theme-provider";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Gradient colors for dark mode */
  gradientColors?: string;
  /** Gradient colors for light mode */
  lightGradientColors?: string;
  /** Whether the spotlight glow extends outside the card bounds (default: true) */
  spotlightOverflow?: boolean;
  /** Size of the spotlight in pixels (default: 400) */
  spotlightSize?: number;
  /** Blur amount in pixels (default: 80) */
  spotlightBlur?: number;
  /** Opacity of spotlight when hovering (0-1) - dark mode (default: 0.4) */
  spotlightOpacity?: number;
  /** Opacity of spotlight when hovering (0-1) - light mode (default: 0.25) */
  spotlightOpacityLight?: number;
  /** Disable the spotlight effect entirely */
  spotlightDisabled?: boolean;
  /** Always show spotlight (animated randomly) instead of only on hover */
  alwaysOn?: boolean;
  /** Speed of random animation in ms (default: 3000) */
  animationSpeed?: number;
}

const SpotlightCard = ({ 
  children, 
  className = "",
  gradientColors = "linear-gradient(136deg, rgb(255, 155, 38), rgb(107, 33, 239))",
  lightGradientColors = "linear-gradient(136deg, rgb(251, 191, 36), rgb(139, 92, 246))",
  spotlightOverflow = true,
  spotlightSize = 400,
  spotlightBlur = 80,
  spotlightOpacity = 0.4,
  spotlightOpacityLight = 0.25,
  spotlightDisabled = false,
  alwaysOn = false,
  animationSpeed = 3000,
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedPosition, setAnimatedPosition] = useState({ x: 200, y: 100 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Animated random movement for alwaysOn mode
  useEffect(() => {
    if (!alwaysOn || spotlightDisabled) return;

    const moveSpotlight = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      // Random position within the card bounds with some padding
      const padding = spotlightSize / 4;
      const x = padding + Math.random() * (rect.width - padding * 2);
      const y = padding + Math.random() * (rect.height - padding * 2);
      setAnimatedPosition({ x, y });
    };

    // Initial position
    moveSpotlight();

    // Set up interval for continuous movement
    const interval = setInterval(moveSpotlight, animationSpeed);

    return () => clearInterval(interval);
  }, [alwaysOn, spotlightDisabled, animationSpeed, spotlightSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Determine position and opacity based on mode
  const currentPosition = alwaysOn && !isHovering ? animatedPosition : mousePosition;
  const showSpotlight = alwaysOn || isHovering;

  // Extract primary color from gradient for radial spotlight
  const extractColor = (gradient: string) => {
    const match = gradient.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
    return { r: 59, g: 130, b: 246 }; // fallback blue
  };

  const color = extractColor(isDark ? gradientColors : lightGradientColors);
  const baseOpacity = showSpotlight ? (isDark ? spotlightOpacity : spotlightOpacityLight) : 0;

  // Create smooth radial gradient with multiple stops to prevent banding
  const smoothRadialGradient = `radial-gradient(circle, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.8}) 0%, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.6}) 15%, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.4}) 30%, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.25}) 45%, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.12}) 60%, 
    rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.05}) 75%, 
    rgba(${color.r}, ${color.g}, ${color.b}, 0) 100%
  )`;

  const spotlightElement = !spotlightDisabled && (
    <span
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        background: smoothRadialGradient,
        left: currentPosition.x,
        top: currentPosition.y,
        width: `${spotlightSize}px`,
        height: `${spotlightSize}px`,
        borderRadius: "50%",
        transition: alwaysOn && !isHovering 
          ? `left ${animationSpeed}ms ease-in-out, top ${animationSpeed}ms ease-in-out, background 300ms`
          : 'background 300ms',
      }}
    />
  );

  // Overflow variant: spotlight outside card, can extend beyond bounds
  if (spotlightOverflow) {
    return (
      <div className="relative">
        {/* Spotlight positioned outside card for overflow effect */}
        <div className="absolute inset-0 z-0">
          {spotlightElement}
        </div>
        
        {/* Card with clipped content */}
        <div
          ref={cardRef}
          className={`relative z-10 overflow-hidden rounded-2xl border-2 border-slate-200/50 dark:border-white/10 backdrop-blur-[13px] bg-white/60 dark:bg-white/5 shadow-lg dark:shadow-none transition-colors duration-300 ${className}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Contained variant: spotlight clipped to card bounds
  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border-2 border-slate-200/50 dark:border-white/10 backdrop-blur-[13px] bg-white/60 dark:bg-white/5 shadow-lg dark:shadow-none transition-colors duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight clipped inside card */}
      {spotlightElement}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
