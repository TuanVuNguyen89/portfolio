import { useEffect, useState } from 'react';

export default function BackgroundVisuals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="background-visuals">
      {/* Mount Fuji Silhouette */}
      <svg
        className="bg-visual mount-fuji"
        viewBox="0 0 200 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 150 L60 50 L100 70 L140 30 L200 150 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.15"
        />
      </svg>

      {/* Virus/Malware Symbols - Scattered throughout */}
      <div className="bg-visual virus-icon virus-1">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="7.757" y1="7.757" x2="16.243" y2="16.243" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="16.243" y1="7.757" x2="7.757" y2="16.243" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </div>

      <div className="bg-visual virus-icon virus-2">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.08"
          />
        </svg>
      </div>

      <div className="bg-visual malware-icon malware-1">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          <path d="M8 8 L16 16 M16 8 L8 16" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
        </svg>
      </div>

      <div className="bg-visual malware-icon malware-2">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <path d="M6 12 L18 12 M12 6 L12 18" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" opacity="0.08" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" opacity="0.08" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" opacity="0.08" />
          <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.08" />
        </svg>
      </div>

      <div className="bg-visual malware-icon malware-3">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polygon
            points="12,4 16,10 22,12 16,14 12,20 8,14 2,12 8,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Terminal/Code Symbols */}
      <div className="bg-visual code-symbol code-1">{'< />'}</div>
      <div className="bg-visual code-symbol code-2">{'{ }'}</div>
      <div className="bg-visual code-symbol code-3">{'[ ]'}</div>
    </div>
  );
}
