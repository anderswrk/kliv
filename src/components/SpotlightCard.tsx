import React, { useRef, useState, useEffect, ReactNode } from "react";
import { useTheme } from "@/components/theme-provider";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Primary spotlight color as "r, g, b" (default: warm gold) */
  spotlightColor?: string;
  /** Secondary spotlight color for dual mode (default: warm orange) */
  spotlightColor2?: string;
  /** Light mode primary color */
  lightSpotlightColor?: string;
  /** Light mode secondary color */
  lightSpotlightColor2?: string;
  /** Whether the spotlight glow extends outside the card bounds (default: false) */
  spotlightOverflow?: boolean;
  /** Size of the spotlight in pixels (default: 350) */
  spotlightSize?: number;
  /** Opacity of spotlight (0-1) - dark mode (default: 0.6) */
  spotlightOpacity?: number;
  /** Opacity of spotlight (0-1) - light mode (default: 0.35) */
  spotlightOpacityLight?: number;
  /** Disable the spotlight effect entirely */
  spotlightDisabled?: boolean;
  /** Always show spotlight (animated randomly) instead of only on hover */
  alwaysOn?: boolean;
  /** Use dual spotlights for movie premiere effect */
  dualSpotlights?: boolean;
  /** Speed of primary spotlight animation in ms (default: 2500) */
  animationSpeed?: number;
  /** Secondary spotlight animation speed (default: 3200) */
  animationSpeed2?: number;
  // Legacy props for backward compatibility
  gradientColors?: string;
  lightGradientColors?: string;
  spotlightBlur?: number;
}

const SpotlightCard = ({ 
  children, 
  className = "",
  spotlightColor = "255, 195, 90",
  spotlightColor2 = "255, 155, 70",
  lightSpotlightColor = "255, 170, 60",
  lightSpotlightColor2 = "255, 130, 50",
  spotlightOverflow = false,
  spotlightSize = 350,
  spotlightOpacity = 0.6,
  spotlightOpacityLight = 0.35,
  spotlightDisabled = false,
  alwaysOn = false,
  dualSpotlights = false,
  animationSpeed = 2500,
  animationSpeed2 = 3200,
  // Legacy props - extract color if provided
  gradientColors,
  lightGradientColors,
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedPosition1, setAnimatedPosition1] = useState({ x: 100, y: 80 });
  const [animatedPosition2, setAnimatedPosition2] = useState({ x: 300, y: 120 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Extract color from legacy gradient format if provided
  const extractColorFromGradient = (gradient: string): string | null => {
    const match = gradient.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return `${match[1]}, ${match[2]}, ${match[3]}`;
    }
    return null;
  };

  // Use legacy colors if provided, otherwise use new format
  const color1 = isDark 
    ? (gradientColors ? extractColorFromGradient(gradientColors) || spotlightColor : spotlightColor)
    : (lightGradientColors ? extractColorFromGradient(lightGradientColors) || lightSpotlightColor : lightSpotlightColor);
  const color2 = isDark ? spotlightColor2 : lightSpotlightColor2;
  const opacity = isDark ? spotlightOpacity : spotlightOpacityLight;

  // Animated random movement for alwaysOn mode - Spotlight 1
  useEffect(() => {
    if (!alwaysOn || spotlightDisabled) return;

    const moveSpotlight = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const padding = spotlightSize / 3;
      const x = padding + Math.random() * (rect.width - padding * 2);
      const y = padding + Math.random() * (rect.height - padding * 2);
      setAnimatedPosition1({ x, y });
    };

    moveSpotlight();
    const interval = setInterval(moveSpotlight, animationSpeed);
    return () => clearInterval(interval);
  }, [alwaysOn, spotlightDisabled, animationSpeed, spotlightSize]);

  // Animated random movement for alwaysOn mode - Spotlight 2
  useEffect(() => {
    if (!alwaysOn || spotlightDisabled || !dualSpotlights) return;

    let interval: ReturnType<typeof setInterval>;
    
    const moveSpotlight = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const padding = spotlightSize / 3;
      const x = padding + Math.random() * (rect.width - padding * 2);
      const y = padding + Math.random() * (rect.height - padding * 2);
      setAnimatedPosition2({ x, y });
    };

    // Offset start for desync effect
    const timeout = setTimeout(() => {
      moveSpotlight();
      interval = setInterval(moveSpotlight, animationSpeed2);
    }, animationSpeed2 / 3);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [alwaysOn, spotlightDisabled, dualSpotlights, animationSpeed2, spotlightSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const showSpotlight = alwaysOn || isHovering;

  // Position logic
  const pos1 = alwaysOn && !isHovering ? animatedPosition1 : mousePosition;
  const pos2 = animatedPosition2;

  const createSpotlightStyle = (pos: {x: number, y: number}, color: string, speed: number, visible: boolean): React.CSSProperties => ({
    background: `radial-gradient(circle at center, 
      rgba(${color}, ${visible ? opacity : 0}) 0%, 
      rgba(${color}, ${visible ? opacity * 0.92 : 0}) 10%, 
      rgba(${color}, ${visible ? opacity * 0.78 : 0}) 22%, 
      rgba(${color}, ${visible ? opacity * 0.6 : 0}) 35%, 
      rgba(${color}, ${visible ? opacity * 0.4 : 0}) 48%, 
      rgba(${color}, ${visible ? opacity * 0.22 : 0}) 60%, 
      rgba(${color}, ${visible ? opacity * 0.1 : 0}) 75%, 
      rgba(${color}, ${visible ? opacity * 0.03 : 0}) 88%, 
      rgba(${color}, 0) 100%
    )`,
    left: pos.x,
    top: pos.y,
    width: `${spotlightSize}px`,
    height: `${spotlightSize}px`,
    borderRadius: "50%",
    transition: alwaysOn && !isHovering 
      ? `left ${speed}ms cubic-bezier(0.25, 0.1, 0.25, 1), top ${speed}ms cubic-bezier(0.25, 0.1, 0.25, 1), background 500ms ease`
      : 'background 400ms ease',
  });

  const spotlightElements = !spotlightDisabled && (
    <>
      {/* Primary spotlight */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={createSpotlightStyle(pos1, color1, animationSpeed, showSpotlight)}
      />
      
      {/* Secondary spotlight for dual mode */}
      {dualSpotlights && (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={createSpotlightStyle(pos2, color2, animationSpeed2, showSpotlight)}
        />
      )}
    </>
  );

  // Overflow variant: spotlights extend beyond card bounds
  if (spotlightOverflow) {
    return (
      <div className="relative">
        {/* Spotlights positioned outside card for overflow effect */}
        <div className="absolute inset-0 z-0 overflow-visible">
          {spotlightElements}
        </div>
        
        {/* Card */}
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

  // Contained variant: spotlight clipped to card bounds (default)
  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border-2 border-slate-200/50 dark:border-white/10 backdrop-blur-[13px] bg-white/60 dark:bg-white/5 shadow-lg dark:shadow-none transition-colors duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {spotlightElements}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
