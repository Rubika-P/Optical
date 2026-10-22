import React from 'react';

/**
 * GrandOpticalsLogo
 * High-fidelity vector recreation of the Grand Opticals Eye Clinic logo.
 * Features:
 * - Stylized "G" monogram enclosing a radiant sapphire/cyan human eye
 * - Spectacle frame temples extending outwards
 * - Bold serif "GRAND OPTICALS" typography
 * - Clean "— EYE CLINIC —" sub-brand with accent balance lines
 * - "Better Vision | Brighter Tomorrow" slogan with underline arc
 */
const GrandOpticalsLogo = ({ 
  variant = 'horizontal', // 'horizontal' | 'stacked' | 'icon-only' | 'compact'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  theme = 'light', // 'light' | 'dark'
  className = '' 
}) => {
  const isDark = theme === 'dark';

  // Dimension scaling
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const primaryTextColor = isDark ? '#FFFFFF' : '#0B4D8C';
  const clinicTextColor = isDark ? '#38BDF8' : '#0284C7';
  const sloganTextColor = isDark ? '#94A3B8' : '#1E3A5F';
  const arcColor = isDark ? '#38BDF8' : '#0284C7';

  // SVG Icon component
  const LogoIcon = ({ iconClass = '' }) => (
    <svg 
      viewBox="0 0 200 130" 
      className={`${iconClass} shrink-0`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Monogram Outer Gradient */}
        <linearGradient id="goBlueGrad" x1="20" y1="20" x2="180" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0052A3" />
          <stop offset="45%" stopColor="#0077D4" />
          <stop offset="75%" stopColor="#00A3E0" />
          <stop offset="100%" stopColor="#004085" />
        </linearGradient>

        {/* Iris Gradient */}
        <radialGradient id="irisGrad" cx="100" cy="65" r="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#001833" />
          <stop offset="25%" stopColor="#004E92" />
          <stop offset="60%" stopColor="#008BE3" />
          <stop offset="85%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#48CAE4" />
        </radialGradient>

        {/* Glass Frame Gradient */}
        <linearGradient id="frameGrad" x1="10" y1="35" x2="190" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#004D99" />
          <stop offset="50%" stopColor="#007ACC" />
          <stop offset="100%" stopColor="#004D99" />
        </linearGradient>

        {/* Subtle drop shadow */}
        <filter id="glowSubtle" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0077D4" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Spectacle Frame Wings (Left & Right) */}
      <g stroke="url(#frameGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left Temple */}
        <path d="M 58 46 C 45 42 26 40 18 52 C 14 58 17 68 22 72" />
        {/* Right Temple */}
        <path d="M 142 46 C 155 42 174 40 182 52 C 186 58 183 68 178 72" />
      </g>

      {/* Main Stylized 'G' & Eye Enclosure */}
      <path 
        d="M 100 12 C 132 12 158 32 163 60 C 160 58 152 56 142 56 C 134 38 118 26 100 26 C 75 26 54 44 50 68 C 47 88 61 108 82 115 C 104 121 127 114 140 98 C 144 93 147 86 148 78 L 126 78 C 122 86 114 92 104 94 C 84 97 66 84 64 65 C 67 48 83 35 100 35 C 114 35 126 43 131 55 C 118 50 82 50 69 65 C 80 78 120 78 131 65 L 164 65 C 164 74 161 85 155 95 C 142 116 116 126 91 123 C 62 119 40 95 38 66 C 36 34 65 12 100 12 Z" 
        fill="url(#goBlueGrad)" 
        filter="url(#glowSubtle)"
      />

      {/* Stylized Eyebrow Arc */}
      <path 
        d="M 68 47 C 82 36 118 36 132 47 C 122 41 78 41 68 47 Z" 
        fill="#005BAA"
      />

      {/* Eye Iris with realistic detail */}
      <g>
        {/* Outer Iris circle */}
        <circle cx="100" cy="65" r="22" fill="url(#irisGrad)" />
        
        {/* Radial Iris Strands */}
        <circle cx="100" cy="65" r="19" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <circle cx="100" cy="65" r="15" stroke="#E0F2FE" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.5" />
        
        {/* Pupil */}
        <circle cx="100" cy="65" r="9.5" fill="#030712" />

        {/* Specular Catchlights */}
        <circle cx="103.5" cy="61.5" r="3.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="96" cy="68" r="1.5" fill="#E0F2FE" opacity="0.8" />
      </g>
    </svg>
  );

  // Icon Only
  if (variant === 'icon-only') {
    return <LogoIcon iconClass={`${iconSizes[size]} ${className}`} />;
  }

  // Compact Horizontal (for sticky navbar / minimal headers)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2.5 ${className}`}>
        <LogoIcon iconClass={iconSizes[size]} />
        <div className="flex flex-col text-left">
          <span 
            className="font-bold tracking-[0.12em] uppercase leading-none font-sans text-base sm:text-lg"
            style={{ color: primaryTextColor }}
          >
            GRAND OPTICALS
          </span>
          <span 
            className="text-[9px] tracking-[0.25em] font-semibold uppercase mt-0.5 leading-none"
            style={{ color: clinicTextColor }}
          >
            EYE CLINIC
          </span>
        </div>
      </div>
    );
  }

  // Stacked Layout (for hero showcases, splash screens, about page, or checkout receipts)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoIcon iconClass={`${size === 'xl' ? 'w-28 h-20' : size === 'lg' ? 'w-24 h-16' : 'w-16 h-12'} mb-2`} />
        
        {/* GRAND OPTICALS */}
        <h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.14em] uppercase font-sans leading-tight"
          style={{ color: primaryTextColor }}
        >
          GRAND OPTICALS
        </h1>

        {/* — EYE CLINIC — with balance lines */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-[280px] my-1">
          <div className="h-[1.5px] flex-1" style={{ backgroundColor: clinicTextColor }} />
          <span 
            className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ color: clinicTextColor }}
          >
            EYE CLINIC
          </span>
          <div className="h-[1.5px] flex-1" style={{ backgroundColor: clinicTextColor }} />
        </div>

        {/* Better Vision | Brighter Tomorrow */}
        <div className="flex flex-col items-center mt-1">
          <span 
            className="text-[11px] sm:text-xs font-medium tracking-[0.12em]"
            style={{ color: sloganTextColor }}
          >
            Better Vision &nbsp;|&nbsp; Brighter Tomorrow
          </span>
          {/* Subtle curved arc underline */}
          <svg viewBox="0 0 160 12" className="w-28 sm:w-36 h-2.5 mt-0.5" fill="none">
            <path d="M 5 1 C 55 10 105 10 155 1" stroke={arcColor} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }

  // Full Horizontal (default: icon + name + eye clinic line + slogan)
  return (
    <div className={`flex items-center space-x-3 text-left ${className}`}>
      <LogoIcon iconClass={iconSizes[size]} />
      <div className="flex flex-col">
        {/* Main Name */}
        <div 
          className="font-extrabold tracking-[0.12em] uppercase font-sans leading-none text-base sm:text-xl lg:text-2xl"
          style={{ color: primaryTextColor }}
        >
          GRAND OPTICALS
        </div>

        {/* — EYE CLINIC — */}
        <div className="flex items-center space-x-2 my-0.5">
          <div className="h-[1px] w-4 sm:w-6" style={{ backgroundColor: clinicTextColor }} />
          <span 
            className="text-[8px] sm:text-[10px] font-bold tracking-[0.28em] uppercase leading-none"
            style={{ color: clinicTextColor }}
          >
            EYE CLINIC
          </span>
          <div className="h-[1px] w-4 sm:w-6" style={{ backgroundColor: clinicTextColor }} />
        </div>

        {/* Slogan */}
        <div className="hidden sm:flex flex-col items-start">
          <span 
            className="text-[8px] font-medium tracking-[0.08em] opacity-90 leading-none"
            style={{ color: sloganTextColor }}
          >
            Better Vision &nbsp;|&nbsp; Brighter Tomorrow
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrandOpticalsLogo;
