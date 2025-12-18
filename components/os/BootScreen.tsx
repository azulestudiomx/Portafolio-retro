
import React, { useEffect, useState } from 'react';
import { IconAzulLogo } from '../icons/OsIcons';
import GridScan from '../bits/GridScan';
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
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center cursor-watch font-chicago select-none relative overflow-hidden">

      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="bg-white border-2 border-black p-8 pb-12 shadow-[4px_4px_0_rgba(0,0,0,0.2)] w-[400px] flex flex-col items-center relative z-10">
        {/* Left decorations */}
        <div className="absolute left-4 top-0 h-full flex flex-col justify-center space-y-1 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-1 h-8 bg-gray-400 rounded-full"></div>
          ))}
        </div>

        {/* Main Logo Area */}
        <div className="flex items-center space-x-4 mb-8 scale-125">
          <IconAzulLogo className="w-16 h-16" />
          <div className="flex flex-col">
            <span className="text-4xl font-bold tracking-tighter">Azul Estudio</span>
            <span className="text-xs tracking-widest text-gray-500 font-bold uppercase text-right">System 8.0</span>
          </div>
        </div>

        <div className="text-sm font-bold mb-2 w-full text-left pl-6">
          Cargando escritorio...
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
      <div className="mt-4 text-gray-400 text-xs font-bold z-10">
        © 2023 Azul Estudio - Carlos Caceres
      </div>
    </div>
  );
};
