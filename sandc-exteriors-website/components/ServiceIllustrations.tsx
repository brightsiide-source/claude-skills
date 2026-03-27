export function RoofingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House body */}
      <rect x="80" y="140" width="240" height="130" rx="4" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
      {/* Roof */}
      <path d="M60 145L200 50L340 145" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 140L200 60L320 140" fill="#2D2D2D" />
      {/* Roof shingles */}
      <path d="M100 130L200 70L300 130" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M110 125L200 75L290 125" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.2" />
      {/* Chimney */}
      <rect x="260" y="70" width="30" height="60" rx="2" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Door */}
      <rect x="175" y="200" width="50" height="70" rx="3" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1.5" />
      <circle cx="215" cy="238" r="3" fill="#C0C0C0" />
      {/* Windows */}
      <rect x="105" y="170" width="45" height="40" rx="2" fill="#111111" stroke="#C0C0C0" strokeWidth="1.5" />
      <line x1="127.5" y1="170" x2="127.5" y2="210" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="105" y1="190" x2="150" y2="190" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="250" y="170" width="45" height="40" rx="2" fill="#111111" stroke="#C0C0C0" strokeWidth="1.5" />
      <line x1="272.5" y1="170" x2="272.5" y2="210" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="250" y1="190" x2="295" y2="190" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.5" />
      {/* Hammer tool floating */}
      <g className="animate-float" style={{ transformOrigin: "350px 80px" }}>
        <rect x="340" y="60" width="6" height="40" rx="2" fill="#C0C0C0" transform="rotate(-30 340 60)" />
        <rect x="328" y="52" width="20" height="12" rx="2" fill="#C0C0C0" transform="rotate(-30 328 52)" />
      </g>
      {/* Decorative sparkles */}
      <circle cx="50" cy="90" r="2" fill="#C0C0C0" opacity="0.6" className="animate-pulse" />
      <circle cx="360" cy="120" r="2" fill="#C0C0C0" opacity="0.4" className="animate-pulse" />
      <circle cx="30" cy="200" r="1.5" fill="#C0C0C0" opacity="0.3" className="animate-pulse" />
    </svg>
  );
}

export function SidingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House wall */}
      <rect x="60" y="60" width="280" height="210" rx="4" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
      {/* Siding lines */}
      {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((y, i) => (
        <line key={i} x1="65" y1={y} x2="335" y2={y} stroke="#C0C0C0" strokeWidth="1" strokeOpacity={0.2 + (i % 3) * 0.1} />
      ))}
      {/* Window */}
      <rect x="120" y="100" width="70" height="60" rx="3" fill="#111111" stroke="#C0C0C0" strokeWidth="2" />
      <line x1="155" y1="100" x2="155" y2="160" stroke="#C0C0C0" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="120" y1="130" x2="190" y2="130" stroke="#C0C0C0" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Second window */}
      <rect x="220" y="100" width="70" height="60" rx="3" fill="#111111" stroke="#C0C0C0" strokeWidth="2" />
      <line x1="255" y1="100" x2="255" y2="160" stroke="#C0C0C0" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="220" y1="130" x2="290" y2="130" stroke="#C0C0C0" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* New siding panel being installed */}
      <rect x="60" y="180" width="140" height="90" rx="2" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="2" strokeDasharray="8 4" />
      <text x="130" y="230" textAnchor="middle" fill="#C0C0C0" fontSize="11" fontFamily="system-ui" opacity="0.7">NEW SIDING</text>
      {/* Arrow */}
      <path d="M130 175L130 185" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
      <path d="M125 180L130 186L135 180" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      {/* Sparkles */}
      <circle cx="40" cy="130" r="2" fill="#C0C0C0" opacity="0.5" className="animate-pulse" />
      <circle cx="370" cy="90" r="2" fill="#C0C0C0" opacity="0.4" className="animate-pulse" />
    </svg>
  );
}

export function GutterIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roof edge */}
      <path d="M40 80L200 30L360 80" stroke="#C0C0C0" strokeWidth="2.5" />
      <path d="M40 80L360 80L360 95L40 95Z" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Gutter channel */}
      <path d="M40 95L40 105C40 108 42 110 45 110L355 110C358 110 360 108 360 105L360 95" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
      {/* Gutter brackets */}
      {[80, 160, 240, 320].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y="110" width="6" height="15" rx="1" fill="#C0C0C0" opacity="0.6" />
        </g>
      ))}
      {/* Downspout */}
      <rect x="348" y="110" width="18" height="160" rx="3" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Water drops flowing */}
      <g className="animate-float">
        <circle cx="357" cy="180" r="4" fill="#C0C0C0" opacity="0.3" />
        <circle cx="357" cy="200" r="3" fill="#C0C0C0" opacity="0.25" />
        <circle cx="357" cy="216" r="2.5" fill="#C0C0C0" opacity="0.2" />
      </g>
      {/* Rain drops */}
      {[60, 100, 140, 180, 220, 260, 300].map((x, i) => (
        <line key={i} x1={x} y1={30 + (i % 3) * 10} x2={x - 5} y2={50 + (i % 3) * 10} stroke="#C0C0C0" strokeWidth="1" opacity={0.15 + (i % 4) * 0.05} />
      ))}
      {/* House wall */}
      <rect x="50" y="125" width="290" height="150" rx="2" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.3" />
      {/* Water splash at bottom */}
      <path d="M340 270C345 265 350 268 355 265C360 268 365 265 370 270" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Sparkles */}
      <circle cx="30" cy="50" r="2" fill="#C0C0C0" opacity="0.5" className="animate-pulse" />
      <circle cx="380" cy="150" r="1.5" fill="#C0C0C0" opacity="0.4" className="animate-pulse" />
    </svg>
  );
}

export function ConcreteIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Driveway / concrete slab */}
      <path d="M60 280L120 160L280 160L340 280Z" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="2" />
      {/* Concrete texture joints */}
      <line x1="150" y1="165" x2="120" y2="275" stroke="#C0C0C0" strokeWidth="1" opacity="0.3" />
      <line x1="210" y1="165" x2="210" y2="275" stroke="#C0C0C0" strokeWidth="1" opacity="0.3" />
      <line x1="250" y1="165" x2="290" y2="275" stroke="#C0C0C0" strokeWidth="1" opacity="0.3" />
      <line x1="130" y1="210" x2="275" y2="210" stroke="#C0C0C0" strokeWidth="1" opacity="0.25" />
      <line x1="100" y1="245" x2="305" y2="245" stroke="#C0C0C0" strokeWidth="1" opacity="0.25" />
      {/* Trowel tool */}
      <g className="animate-float" style={{ transformOrigin: "320px 100px" }}>
        <path d="M300 120L340 80" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
        <path d="M335 85L360 60L370 70L345 95Z" fill="#C0C0C0" opacity="0.8" />
      </g>
      {/* Concrete mixer / bucket */}
      <path d="M30 200L50 160L90 160L110 200Z" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1.5" />
      <ellipse cx="70" cy="160" rx="25" ry="6" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Fresh concrete effect - shimmer */}
      <rect x="140" y="170" width="120" height="30" rx="2" fill="#C0C0C0" opacity="0.06" className="animate-shimmer" />
      {/* Sparkles */}
      <circle cx="200" cy="60" r="2.5" fill="#C0C0C0" opacity="0.5" className="animate-pulse" />
      <circle cx="380" cy="200" r="2" fill="#C0C0C0" opacity="0.4" className="animate-pulse" />
      <circle cx="20" cy="140" r="1.5" fill="#C0C0C0" opacity="0.3" className="animate-pulse" />
      {/* "NEW" label on fresh section */}
      <rect x="160" y="185" width="80" height="20" rx="10" fill="none" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="200" y="199" textAnchor="middle" fill="#C0C0C0" fontSize="10" fontFamily="system-ui" opacity="0.6">FRESH POUR</text>
    </svg>
  );
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main house */}
      <rect x="120" y="180" width="260" height="170" rx="4" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
      {/* Roof */}
      <path d="M100 185L250 80L400 185" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 180L250 90L380 180" fill="#2D2D2D" />
      {/* Roof shingles detail */}
      <path d="M140 170L250 100L360 170" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.25" />
      <path d="M155 163L250 107L345 163" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.18" />
      {/* Chimney */}
      <rect x="310" y="100" width="28" height="70" rx="2" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Smoke wisps */}
      <path d="M324 95C324 85 330 80 324 70" stroke="#C0C0C0" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <path d="M320 90C318 78 326 73 320 62" stroke="#C0C0C0" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      {/* Door */}
      <rect x="220" y="270" width="60" height="80" rx="4" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="2" />
      <circle cx="265" cy="315" r="4" fill="#C0C0C0" opacity="0.7" />
      {/* Step */}
      <rect x="210" y="345" width="80" height="8" rx="2" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1" />
      {/* Windows */}
      <rect x="145" y="210" width="55" height="45" rx="3" fill="#111111" stroke="#C0C0C0" strokeWidth="2" />
      <line x1="172.5" y1="210" x2="172.5" y2="255" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="145" y1="232.5" x2="200" y2="232.5" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.4" />
      {/* Window glow */}
      <rect x="148" y="213" width="22" height="17" rx="1" fill="#C0C0C0" opacity="0.04" />
      <rect x="300" y="210" width="55" height="45" rx="3" fill="#111111" stroke="#C0C0C0" strokeWidth="2" />
      <line x1="327.5" y1="210" x2="327.5" y2="255" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="300" y1="232.5" x2="355" y2="232.5" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.4" />
      {/* Gutters */}
      <line x1="105" y1="185" x2="395" y2="185" stroke="#C0C0C0" strokeWidth="2.5" />
      {/* Downspout */}
      <rect x="388" y="185" width="10" height="165" rx="2" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1" />
      {/* Driveway */}
      <path d="M160 350L200 350L240 395L100 395Z" fill="#2D2D2D" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.3" />
      {/* Siding detail on walls */}
      {[200, 215, 230, 245, 260, 275, 290, 305, 320, 335].map((y, i) => (
        <line key={i} x1="125" y1={y} x2="218" y2={y} stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity={0.08 + (i % 2) * 0.04} />
      ))}
      {[200, 215, 230, 245, 260, 275, 290, 305, 320, 335].map((y, i) => (
        <line key={`r${i}`} x1="282" y1={y} x2="375" y2={y} stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity={0.08 + (i % 2) * 0.04} />
      ))}
      {/* Floating tools */}
      <g className="animate-float">
        <rect x="430" y="120" width="5" height="35" rx="2" fill="#C0C0C0" opacity="0.5" transform="rotate(-20 430 120)" />
        <rect x="420" y="113" width="18" height="10" rx="2" fill="#C0C0C0" opacity="0.5" transform="rotate(-20 420 113)" />
      </g>
      <g className="animate-float-delayed">
        <circle cx="60" cy="160" r="12" fill="none" stroke="#C0C0C0" strokeWidth="1.5" opacity="0.3" />
        <line x1="54" y1="160" x2="66" y2="160" stroke="#C0C0C0" strokeWidth="1.5" opacity="0.3" />
        <line x1="60" y1="154" x2="60" y2="166" stroke="#C0C0C0" strokeWidth="1.5" opacity="0.3" />
      </g>
      {/* Decorative circles */}
      <circle cx="40" cy="80" r="3" fill="#C0C0C0" opacity="0.15" />
      <circle cx="460" cy="200" r="4" fill="#C0C0C0" opacity="0.12" />
      <circle cx="470" cy="80" r="2.5" fill="#C0C0C0" opacity="0.18" className="animate-pulse" />
      <circle cx="25" cy="300" r="2" fill="#C0C0C0" opacity="0.1" className="animate-pulse" />
      {/* Ground line */}
      <line x1="20" y1="352" x2="480" y2="352" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.15" />
      {/* Trees/bushes */}
      <circle cx="80" cy="330" r="20" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="95" cy="325" r="15" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="85" y="340" width="6" height="12" fill="#2D2D2D" />
      <circle cx="420" cy="335" r="16" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="418" y="345" width="5" height="8" fill="#2D2D2D" />
    </svg>
  );
}
