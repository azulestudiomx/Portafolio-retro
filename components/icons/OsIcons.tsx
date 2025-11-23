
import React from 'react';

export const IconFolder: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6H12L14 8H30V26H2V6Z" fill="#a0a0ff" stroke="black" strokeWidth="2"/>
    <path d="M2 10H30V26H2V10Z" fill="#ccccff" stroke="black" strokeWidth="2"/>
    <path d="M4 12H28" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
  </svg>
);

export const IconDisk: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" fill="#d0d0d0" stroke="black" strokeWidth="2"/>
    <rect x="8" y="6" width="16" height="12" fill="white" stroke="black" strokeWidth="1"/>
    <rect x="8" y="22" width="16" height="4" fill="#a0a0a0" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconDoc: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H20L26 8V30H6V2Z" fill="white" stroke="black" strokeWidth="2"/>
    <path d="M20 2V8H26" fill="#e0e0e0" stroke="black" strokeWidth="2"/>
    <line x1="10" y1="12" x2="22" y2="12" stroke="black" strokeWidth="2"/>
    <line x1="10" y1="16" x2="22" y2="16" stroke="black" strokeWidth="2"/>
    <line x1="10" y1="20" x2="22" y2="20" stroke="black" strokeWidth="2"/>
  </svg>
);

export const IconMail: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="28" height="18" fill="#ffebcd" stroke="black" strokeWidth="2"/>
    <path d="M2 8L16 18L30 8" stroke="black" strokeWidth="2" fill="none"/>
    <circle cx="16" cy="17" r="3" fill="#ff0000" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconPic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="28" height="24" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
    <circle cx="9" cy="10" r="3" fill="#ffcc00" stroke="black" strokeWidth="1"/>
    <path d="M26 24L20 16L14 24H26Z" fill="#00cc00" stroke="black" strokeWidth="1"/>
    <path d="M16 24L10 18L4 24H16Z" fill="#009900" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconBrush: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
     {/* Paint Bucket / Brush Hybrid for Application Icon */}
     <rect x="6" y="8" width="20" height="16" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
     <path d="M6 12H26" stroke="black" strokeWidth="2"/>
     {/* Brush */}
     <path d="M20 20L28 28" stroke="black" strokeWidth="3" strokeLinecap="round"/>
     <path d="M18 18L22 22" stroke="#8b4513" strokeWidth="4"/>
     <circle cx="18" cy="18" r="3" fill="black" />
     {/* Paint splotch */}
     <path d="M10 18C10 18 8 22 10 24C12 26 14 24 14 22" fill="#ff0000" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconCD: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="16" cy="16" r="14" fill="#e0e0e0" stroke="black" strokeWidth="1.5" />
     <circle cx="16" cy="16" r="4" fill="white" stroke="black" strokeWidth="1" />
     
     {/* Rainbow shine effect */}
     <path d="M16 2 A 14 14 0 0 1 29 11 L 16 16 Z" fill="rgba(255,0,0,0.1)" />
     <path d="M29 11 A 14 14 0 0 1 23 28 L 16 16 Z" fill="rgba(0,0,255,0.1)" />
     <path d="M23 28 A 14 14 0 0 1 4 21 L 16 16 Z" fill="rgba(0,255,0,0.1)" />
     
     <circle cx="16" cy="16" r="1.5" fill="black" opacity="0.1" />
  </svg>
);

export const IconTerminal: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="28" height="24" rx="2" fill="#1a1a1a" stroke="black" strokeWidth="2"/>
        <path d="M6 10L10 14L6 18" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="18" x2="18" y2="18" stroke="#00ff00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const IconSettings: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="28" height="28" fill="#e0e0e0" stroke="black" strokeWidth="2"/>
        <rect x="4" y="4" width="24" height="24" fill="#f0f0f0" stroke="black" strokeWidth="1" />
        
        {/* Sliders */}
        <line x1="10" y1="6" x2="10" y2="26" stroke="#808080" strokeWidth="2"/>
        <rect x="8" y="10" width="4" height="6" fill="black" stroke="none"/>
        
        <line x1="16" y1="6" x2="16" y2="26" stroke="#808080" strokeWidth="2"/>
        <rect x="14" y="18" width="4" height="6" fill="black" stroke="none"/>

        <line x1="22" y1="6" x2="22" y2="26" stroke="#808080" strokeWidth="2"/>
        <rect x="20" y="8" width="4" height="6" fill="black" stroke="none"/>
    </svg>
);

export const IconApple: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 170 200" className={className} fill="black">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.93 7.03-9.16 13.06-12.66 18.06-4.52 6.48-9.06 12.92-13.63 19.32-3.41 4.79-8.3 7.19-14.65 7.19-2.92 0-5.83-0.57-8.74-1.72-2.9-1.12-5.73-1.69-8.48-1.69-3.41 0-6.6 0.57-9.56 1.72-2.96 1.15-5.69 1.72-8.2 1.72-6.57 0-11.53-2.58-14.89-7.75-5.63-8.68-10.42-17.65-14.39-26.93-8.46-19.78-12.69-38.64-12.69-56.59 0-16.73 4.22-30.82 12.66-42.27 8.44-11.45 19.98-17.18 34.62-17.18 3.52 0 7.42 0.72 11.71 2.16 4.3 1.43 7.9 2.16 10.81 2.16 2.35 0 5.4-0.63 9.15-1.9 3.75-1.27 7.77-1.9 12.06-1.9 12.9 0 23.95 4.67 33.16 14.01-10.96 7.44-16.44 18.27-16.44 32.51 0 12.15 4.35 22.95 13.04 32.4 2.87 3.12 5.37 5.25 7.49 6.38 0.63 0.33 1.15 0.58 1.57 0.75-2.06 6.38-4.43 11.66-7.1 15.84zM113.84 34.01c5.96-7.9 8.94-17.29 8.94-28.16 0-1.75-0.12-3.69-0.38-5.84-11.77 1.25-21.78 6.55-30.03 15.89-5.12 5.86-8.28 12.72-9.48 20.57-0.52 3.44-0.39 6.22 0.39 8.35 1.53 0.39 3.55 0.58 6.06 0.58 8.22 0 16.38-3.8 24.5-11.39z"/>
  </svg>
);

export const IconMacFace: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified Finder Face / Mac OS Logo */}
        <path d="M4 4H28V28H4V4Z" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
        {/* Left Face */}
        <path d="M4 4H16V28H4V4Z" fill="#a0a0ff"/>
        {/* Right Face */}
        <path d="M16 4H28V28H16V4Z" fill="#a0a0ff"/>
        
        {/* Profiles cut out */}
        <path d="M4 4H14V28H4V4Z" fill="#a0a0ff"/> 
        <path d="M18 4H28V28H18V4Z" fill="#a0a0ff"/>
        
        {/* Abstracted Faces for Logo */}
        <path d="M9 10C9 10 8 12 9 14C10 16 14 14 14 14V28H18V14C18 14 22 16 23 14C24 12 23 10 23 10" fill="#d4d4d4" stroke="black" strokeWidth="1.5"/>
        <path d="M9 10C9 10 6 10 6 16C6 22 10 24 14 24" fill="none" stroke="black" strokeWidth="1.5"/>
        <path d="M23 10C23 10 26 10 26 16C26 22 22 24 18 24" fill="none" stroke="black" strokeWidth="1.5"/>
        
        <circle cx="10.5" cy="10.5" r="1.5" fill="black"/>
        <circle cx="21.5" cy="10.5" r="1.5" fill="black"/>
    </svg>
);

export const IconAzulLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="28" height="28" fill="#3b5998" stroke="black" strokeWidth="2"/>
        <rect x="4" y="4" width="24" height="24" fill="white" stroke="black" strokeWidth="1"/>
        <path d="M16 6L24 24H20L18 19H14L12 24H8L16 6Z" fill="#3b5998"/>
        <path d="M16 11L13 17H19L16 11Z" fill="white"/>
    </svg>
);
