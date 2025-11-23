
import React, { useState, useCallback, useEffect } from 'react';
import { Menubar } from './components/os/Menubar';
import { DesktopIcon } from './components/os/DesktopIcon';
import { Window } from './components/os/Window';
import { Launcher } from './components/os/Launcher';
import { AboutMe } from './components/apps/AboutMe';
import { Projects } from './components/apps/Projects';
import { Contact } from './components/apps/Contact';
import { Resume } from './components/apps/Resume';
import { Gallery } from './components/apps/Gallery';
import { Browser } from './components/apps/Browser';
import { MusicPlayer } from './components/apps/MusicPlayer';
import { Terminal } from './components/apps/Terminal';
import { BootScreen } from './components/os/BootScreen';
import { INITIAL_WINDOWS, DESKTOP_ICONS } from './constants';
import { WindowId, WindowState, IconData } from './types';
import { playClickSound } from './utils/audio';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [icons, setIcons] = useState<IconData[]>(DESKTOP_ICONS);
  const [activeZIndex, setActiveZIndex] = useState(10);
  
  // State for dynamic cursor (Wait / Watch)
  const [isLoading, setIsLoading] = useState(false);
  
  // Wallpaper state (pattern-water by default, or an image URL)
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  // Global Sound Listener for clicks
  useEffect(() => {
      const handleGlobalClick = () => {
          playClickSound();
      };
      window.addEventListener('mousedown', handleGlobalClick);
      return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, []);

  // Update Music Icon position on initial render to bottom right to simulate trash location
  useEffect(() => {
     setIcons(prev => prev.map(icon => {
         if (icon.id === 'music') {
             return { ...icon, position: { x: window.innerWidth - 100, y: window.innerHeight - 150 } };
         }
         return icon;
     }));
  }, []);

  // Fake loading effect when opening apps (Timeout based)
  const triggerLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 800); // 800ms "load" time
  };

  const handleOpenWindow = useCallback((id: WindowId) => {
    triggerLoading();
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      const newZ = activeZIndex + 1;
      setActiveZIndex(newZ);

      if (target) {
        return prev.map((w) =>
          w.id === id ? { ...w, isOpen: true, zIndex: newZ } : w
        );
      }
      return prev;
    });
  }, [activeZIndex]);

  const handleOpenBrowser = useCallback((url: string, title: string) => {
      triggerLoading();
      setWindows((prev) => {
          const newZ = activeZIndex + 1;
          setActiveZIndex(newZ);
          return prev.map((w) => 
            w.id === 'browser' 
                ? { ...w, isOpen: true, zIndex: newZ, title: title, contentProps: { initialUrl: url } }
                : w
          );
      });
  }, [activeZIndex]);

  const handleCloseWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const handleFocusWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const newZ = activeZIndex + 1;
      setActiveZIndex(newZ);
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: newZ } : w
      );
    });
  }, [activeZIndex]);

  const handleMoveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => {
          if (w.id === id) {
              return { ...w, position: { x, y } };
          }
          return w;
      })
    );
  }, []);

  const handleResizeWindow = useCallback((id: WindowId, width: number, height: number) => {
      setWindows((prev) => 
        prev.map((w) => {
            if (w.id === id) {
                return { ...w, size: { width, height } };
            }
            return w;
        })
      );
  }, []);

  const handleIconMove = useCallback((id: WindowId, x: number, y: number) => {
      setIcons((prev) => 
        prev.map((icon) => {
            if (icon.id === id) {
                return { ...icon, position: { x, y }};
            }
            return icon;
        })
      );
  }, []);

  const handleSetWallpaper = (url: string) => {
      setWallpaper(url);
  };

  const renderWindowContent = (window: WindowState) => {
    switch (window.id) {
      case 'about': return <AboutMe />;
      case 'projects': 
        return <Projects onOpenBrowser={handleOpenBrowser} onSetLoading={setIsLoading} />;
      case 'contact': return <Contact />;
      case 'resume': return <Resume />;
      case 'gallery': return <Gallery onSetWallpaper={handleSetWallpaper} />;
      case 'music': return <MusicPlayer />;
      case 'browser': 
        return <Browser initialUrl={window.contentProps?.initialUrl} onSetLoading={setIsLoading} />;
      case 'terminal': 
        return <Terminal onOpenWindow={handleOpenWindow} />;
      default: return null;
    }
  };

  if (!isLoggedIn) {
    return <BootScreen onLoginComplete={() => setIsLoggedIn(true)} />;
  }

  return (
    <div 
        className={`w-screen h-screen overflow-hidden relative font-sans ${isLoading ? 'cursor-watch' : 'cursor-default'} ${!wallpaper ? 'pattern-water' : ''}`}
        style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      
      <Menubar onOpenWindow={handleOpenWindow} onSetWallpaper={handleSetWallpaper} />
      
      {/* Desktop Area */}
      <div className="pt-10 h-full w-full relative">
        {/* Desktop Icons Layer */}
        {icons.map((icon) => (
          <DesktopIcon 
            key={icon.id} 
            icon={icon} 
            onOpen={handleOpenWindow} 
            onMove={handleIconMove}
          />
        ))}

        {/* Windows Layer */}
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            onClose={handleCloseWindow}
            onFocus={handleFocusWindow}
            onMove={handleMoveWindow}
            onResize={handleResizeWindow}
          >
            {renderWindowContent(window)}
          </Window>
        ))}
      </div>

      <Launcher onOpen={handleOpenWindow} />
    </div>
  );
};

export default App;
