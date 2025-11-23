
import React, { useState, useEffect, useRef } from 'react';
import { IconApple } from '../icons/OsIcons';
import { WindowId } from '../../types';

interface MenubarProps {
    onOpenWindow?: (id: WindowId) => void;
    onSetWallpaper?: (url: string) => void;
    onShutdown?: () => void;
}

export const Menubar: React.FC<MenubarProps> = ({ onOpenWindow, onSetWallpaper, onShutdown }) => {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
              setActiveMenu(null);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit' });
  };

  const handleMenuClick = (menu: string) => {
      setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAction = (action: () => void) => {
      action();
      setActiveMenu(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && onSetWallpaper) {
          const url = URL.createObjectURL(file);
          onSetWallpaper(url);
      }
      // Reset input so the same file can be selected again if needed
      if (event.target) {
          event.target.value = '';
      }
  };

  return (
    <div className="h-7 bg-white border-b border-black flex items-center justify-between px-2 fixed top-0 left-0 w-full z-50 font-chicago select-none shadow-md" ref={menuRef}>
      
      {/* Hidden File Input for Wallpaper */}
      <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
      />

      <div className="flex items-center h-full relative">
        <div className="px-3 border-r border-gray-300 h-full flex items-center hover:bg-black hover:text-white cursor-default transition-colors duration-75">
          <IconApple className="w-4 h-4" />
        </div>
        
        {/* Simple Menus */}
        {['Archivo', 'Edición', 'Ver'].map((item) => (
          <div
            key={item}
            className="px-3 h-full flex items-center hover:bg-black hover:text-white cursor-default transition-colors duration-75 text-sm font-bold"
          >
            {item}
          </div>
        ))}

        {/* Special Menu (Interactive) */}
        <div className="relative h-full">
            <div
                className={`px-3 h-full flex items-center cursor-default transition-colors duration-75 text-sm font-bold ${activeMenu === 'Especial' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                onClick={() => handleMenuClick('Especial')}
            >
                Especial
            </div>
            {activeMenu === 'Especial' && (
                <div className="absolute top-full left-0 w-48 bg-white border border-black shadow-[2px_2px_0_rgba(0,0,0,0.2)] py-1 z-50 text-black">
                    <div 
                        className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm font-bold"
                        onClick={() => handleAction(() => {})}
                    >
                        Vaciar Papelera...
                    </div>
                    <div className="border-t border-gray-400 my-1 mx-1"></div>
                     <div 
                        className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm font-bold"
                        onClick={() => handleAction(() => fileInputRef.current?.click())}
                    >
                        Cambiar Fondo...
                    </div>
                    <div className="border-t border-gray-400 my-1 mx-1"></div>
                    <div 
                        className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm font-bold"
                        onClick={() => handleAction(() => onOpenWindow?.('terminal'))}
                    >
                        Terminal...
                    </div>
                    <div 
                        className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm font-bold"
                        onClick={() => handleAction(() => window.location.reload())}
                    >
                        Reiniciar...
                    </div>
                    <div 
                        className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm font-bold"
                        onClick={() => handleAction(() => onShutdown?.())}
                    >
                        Apagar
                    </div>
                </div>
            )}
        </div>

        <div className="px-3 h-full flex items-center hover:bg-black hover:text-white cursor-default transition-colors duration-75 text-sm font-bold">
            Ayuda
        </div>

      </div>
      <div className="flex items-center h-full">
        <div className="px-3 border-l border-gray-300 h-full flex items-center cursor-default text-sm font-bold">
            <span className="mr-2">Finder</span>
            {formatTime(time)}
        </div>
      </div>
    </div>
  );
};
