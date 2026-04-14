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
  // Start positions far apart - opposite corners
  const [animatedPosition1, setAnimatedPosition1] = useState({ x: 80, y: 60 });
  const [animatedPosition2, setAnimatedPosition2] = useState({ x: 500, y: 280 });
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

  // Continuous fluid animation for alwaysOn mode - both spotlights
  useEffect(() => {
    if (!alwaysOn || spotlightDisabled) return;

    let animationId: number;
    let angle1 = 0;
    let angle2 = Math.PI; // Start opposite
    
    // Speed factors based on animationSpeed (lower = faster)
    const speed1 = 3000 / animationSpeed;
    const speed2 = 3000 / animationSpeed2;
    
    // Wobble offsets for organic motion
    let wobble1 = 0;
    let wobble2 = Math.PI * 0.7;
    
    const animate = () => {
      if (!cardRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Spotlight 1 - sweeping arc with wobble
      const radiusX1 = rect.width * 0.35;
      const radiusY1 = rect.height * 0.55;
      angle1 += 0.012 * speed1;
      wobble1 += 0.023 * speed1;
      
      const x1 = centerX + Math.cos(angle1) * radiusX1 + Math.sin(wobble1 * 1.7) * 30;
      const y1 = centerY + Math.sin(angle1 * 0.8) * radiusY1 + Math.cos(wobble1 * 1.3) * 25;
      setAnimatedPosition1({ x: x1, y: y1 });
      
      // Spotlight 2 - different pattern for variety
      if (dualSpotlights) {
        const radiusX2 = rect.width * 0.38;
        const radiusY2 = rect.height * 0.5;
        angle2 += 0.015 * speed2;
        wobble2 += 0.019 * speed2;
        
        const x2 = centerX + Math.cos(angle2 * 1.1) * radiusX2 + Math.sin(wobble2 * 1.4) * 35;
        const y2 = centerY + Math.sin(angle2) * radiusY2 + Math.cos(wobble2 * 1.6) * 30;
        setAnimatedPosition2({ x: x2, y: y2 });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [alwaysOn, spotlightDisabled, dualSpotlights, animationSpeed, animationSpeed2]);

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

  // Position logic - when alwaysOn, always use animated positions (ignore mouse)
  const pos1 = alwaysOn ? animatedPosition1 : mousePosition;
  const pos2 = animatedPosition2;

  const createSpotlightStyle = (pos: {x: number, y: number}, color: string, visible: boolean): React.CSSProperties => ({
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
    filter: `blur(${spotlightSize * 0.15}px)`,
    transition: alwaysOn 
      ? 'background 500ms ease'
      : 'background 400ms ease',
  });

  const spotlightElements = !spotlightDisabled && (
    <>
      {/* Primary spotlight */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={createSpotlightStyle(pos1, color1, showSpotlight)}
      />
      
      {/* Secondary spotlight for dual mode */}
      {dualSpotlights && (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={createSpotlightStyle(pos2, color2, showSpotlight)}
        />
      )}
    </>
  );

  // Create subdued spotlight style for overflow (lower opacity, more blur)
  const createSubduedSpotlightStyle = (pos: {x: number, y: number}, color: string, visible: boolean): React.CSSProperties => {
    const subduedOpacity = opacity * 0.25; // Much dimmer outside
    return {
      background: `radial-gradient(circle at center, 
        rgba(${color}, ${visible ? subduedOpacity : 0}) 0%, 
        rgba(${color}, ${visible ? subduedOpacity * 0.85 : 0}) 15%, 
        rgba(${color}, ${visible ? subduedOpacity * 0.6 : 0}) 35%, 
        rgba(${color}, ${visible ? subduedOpacity * 0.3 : 0}) 55%, 
        rgba(${color}, ${visible ? subduedOpacity * 0.1 : 0}) 75%, 
        rgba(${color}, 0) 100%
      )`,
      left: pos.x,
      top: pos.y,
      width: `${spotlightSize * 1.2}px`,
      height: `${spotlightSize * 1.2}px`,
      borderRadius: "50%",
      filter: `blur(${spotlightSize * 0.25}px)`,
      transition: alwaysOn 
        ? 'background 500ms ease'
        : 'background 400ms ease',
    };
  };

  const subduedSpotlightElements = !spotlightDisabled && (
    <>
      {/* Primary spotlight - subdued for overflow */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={createSubduedSpotlightStyle(pos1, color1, showSpotlight)}
      />
      
      {/* Secondary spotlight for dual mode - subdued */}
      {dualSpotlights && (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={createSubduedSpotlightStyle(pos2, color2, showSpotlight)}
        />
      )}
    </>
  );

  // Overflow variant: spotlights primarily inside card with subdued overflow outside
  if (spotlightOverflow) {
    return (
      <div className="relative">
        {/* Subdued spotlights outside card for soft overflow effect */}
        <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
          {subduedSpotlightElements}
        </div>
        
        {/* Card with main spotlights inside */}
        <div
          ref={cardRef}
          className={`relative z-10 overflow-hidden rounded-2xl border-2 border-slate-200/50 dark:border-white/10 backdrop-blur-[13px] bg-white/60 dark:bg-white/5 shadow-lg dark:shadow-none transition-colors duration-300 ${className}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main spotlights inside the card */}
          {spotlightElements}
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
