
import React, { useEffect, useState } from 'react';
import { IconMacFace } from '../icons/OsIcons';
import { playStartupSound } from '../../utils/audio';

interface BootScreenProps {
  onLoginComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onLoginComplete }) => {
  const [progress, setProgress] = useState(0);

  // Simulate Boot Sequence
  useEffect(() => {
    // Try to play sound immediately (might be blocked by browser autoplay policy until interaction)
    playStartupSound();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a moment at 100% then enter desktop automatically
          setTimeout(() => onLoginComplete(), 1000); 
          return 100;
        }
        // Non-linear loading speed for realism
        const increment = Math.random() * 10; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoginComplete]);

  return (
    <div className="w-screen h-screen bg-[#cdcdcd] flex flex-col items-center justify-center cursor-watch font-chicago select-none relative overflow-hidden">
      <div className="bg-white border-2 border-black p-8 pb-12 shadow-[4px_4px_0_rgba(0,0,0,0.2)] w-[400px] flex flex-col items-center relative">
          {/* Left decorations */}
          <div className="absolute left-4 top-0 h-full flex flex-col justify-center space-y-1 opacity-20">
              {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-1 h-8 bg-gray-400 rounded-full"></div>
              ))}
          </div>

          {/* Main Logo Area */}
          <div className="flex items-center space-x-4 mb-8 scale-125">
              <IconMacFace className="w-16 h-16" />
              <div className="flex flex-col">
                  <span className="text-4xl font-bold tracking-tighter">Mac OS 8</span>
                  <span className="text-xs tracking-widest text-gray-500 font-bold uppercase text-right">Platinum Edition</span>
              </div>
          </div>

          <div className="text-sm font-bold mb-2 w-full text-left pl-6">
              Iniciando Mac OS...
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 h-5 bg-[#a0a0a0] border-t border-l border-gray-600 border-b border-r border-white shadow-inner relative">
              <div 
                  className="h-full bg-gradient-to-b from-[#6060ff] to-[#0000aa]" 
                  style={{ width: `${progress}%`, transition: 'width 0.15s linear' }}
              >
                  {/* Scanline effect on bar */}
                  <div className="w-full h-full border-t border-white opacity-30"></div>
              </div>
          </div>
      </div>
      <div className="mt-4 text-gray-600 text-xs font-bold">
          © 1983-1997 Apple Computer, Inc.
      </div>
    </div>
  );
};
