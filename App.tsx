
import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import { Terminal } from './components/apps/Terminal';
import { Appearance } from './components/apps/Appearance';
import { AiAssistant } from './components/apps/AiAssistant';

import { BootScreen } from './components/os/BootScreen';
import { Screensaver } from './components/os/Screensaver';
import { INITIAL_WINDOWS, DESKTOP_ICONS } from './constants';
import { WindowId, WindowState, IconData } from './types';
import { playClickSound } from './utils/audio';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPoweredOff, setIsPoweredOff] = useState(false); // State for simulated shutdown
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [icons, setIcons] = useState<IconData[]>(DESKTOP_ICONS);
  const [activeZIndex, setActiveZIndex] = useState(10);

  // State for dynamic cursor (Wait / Watch)
  const [isLoading, setIsLoading] = useState(false);

  // Wallpaper state (pattern-water by default, or an image URL)
  const [wallpaper, setWallpaper] = useState<string | null>('https://res.cloudinary.com/dt96yonq2/image/upload/v1766086048/WALL_r5g4aj.jpg');

  // Screensaver State
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const screensaverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Global Sound Listener for clicks
  useEffect(() => {
    const handleGlobalClick = () => {
      if (!isPoweredOff) {
        playClickSound();
      }
    };
    window.addEventListener('mousedown', handleGlobalClick);
    return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, [isPoweredOff]);

  // Update Music Icon position on initial render to bottom right to simulate trash location
  useEffect(() => {
    setIcons(prev => prev.map(icon => {
      if (icon.id === 'music') {
        return { ...icon, position: { x: window.innerWidth - 100, y: window.innerHeight - 150 } };
      }
      return icon;
    }));
  }, []);

  // Cleanup wallpaper object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (wallpaper && wallpaper.startsWith('blob:')) {
        URL.revokeObjectURL(wallpaper);
      }
    };
  }, [wallpaper]);

  // --- IDLE / SCREENSAVER LOGIC ---
  const resetIdleTimer = useCallback(() => {
    // Clear existing timer
    if (screensaverTimerRef.current) clearTimeout(screensaverTimerRef.current);

    // If screensaver is active, interaction kills it
    if (isScreensaverActive) {
      setIsScreensaverActive(false);
    }

    // Start new timer only if logged in and system is on
    if (isLoggedIn && !isPoweredOff) {
      screensaverTimerRef.current = setTimeout(() => {
        setIsScreensaverActive(true);
      }, 120000); // 120,000 ms = 2 minutes
    }
  }, [isScreensaverActive, isLoggedIn, isPoweredOff]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'click', 'scroll', 'touchstart'];
    const handler = () => resetIdleTimer();

    // Attach listeners
    events.forEach(e => window.addEventListener(e, handler));

    // Init timer
    resetIdleTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, handler));
      if (screensaverTimerRef.current) clearTimeout(screensaverTimerRef.current);
    };
  }, [resetIdleTimer]);


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
          return { ...icon, position: { x, y } };
        }
        return icon;
      })
    );
  }, []);

  const handleSetWallpaper = (url: string | null) => {
    setWallpaper(url);
  };

  const handleShutdown = () => {
    setIsPoweredOff(true);
  };

  const handleRestart = () => {
    setIsLoggedIn(false); // Go back to Boot Screen
    setWindows(INITIAL_WINDOWS); // Reset Windows
  };

  const handlePowerOn = () => {
    setIsPoweredOff(false);
    setIsLoggedIn(false); // Reset to boot screen sequence
    setWindows(INITIAL_WINDOWS); // Reset window positions/states
  };

  const renderWindowContent = (window: WindowState) => {
    switch (window.id) {
      case 'about': return <AboutMe />;
      case 'projects':
        return <Projects onOpenBrowser={handleOpenBrowser} onSetLoading={setIsLoading} />;
      case 'contact': return <Contact />;
      case 'resume': return <Resume />;
      case 'gallery': return <Gallery onSetWallpaper={handleSetWallpaper} />;
      case 'browser':
        return <Browser initialUrl={window.contentProps?.initialUrl} onSetLoading={setIsLoading} />;
      case 'terminal':
        return <Terminal onOpenWindow={handleOpenWindow} />;
      case 'appearance':
        return <Appearance onSetWallpaper={handleSetWallpaper} />;
      case 'ai':
        return <AiAssistant />;

      default: return null;
    }
  };

  // --- POWERED OFF STATE ---
  if (isPoweredOff) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Retro Monitor Glare Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white opacity-5 pointer-events-none rounded-[100px]"></div>

        <div className="flex flex-col items-center animate-pulse">
          <button
            onClick={handlePowerOn}
            className="w-24 h-24 rounded-full bg-[#333] border-4 border-[#111] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center active:scale-95 transition-transform group"
            title="Encender Sistema"
          >
            {/* Power Symbol */}
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-500 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
          </button>
          <span className="mt-4 text-gray-500 font-mono text-xs">Apagado. Presione para iniciar.</span>
        </div>
      </div>
    );
  }

  // --- BOOT SCREEN STATE ---
  if (!isLoggedIn) {
    return <BootScreen onLoginComplete={() => setIsLoggedIn(true)} />;
  }

  // --- DESKTOP STATE ---
  return (
    <div
      className={`w-screen h-screen overflow-hidden relative font-sans ${isLoading ? 'cursor-watch' : 'cursor-default'} ${!wallpaper ? 'pattern-water' : ''}`}
      style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}}
    >
      {/* SCREENSAVER OVERLAY */}
      {isScreensaverActive && <Screensaver onExit={() => setIsScreensaverActive(false)} />}

      <Menubar
        onOpenWindow={handleOpenWindow}
        onSetWallpaper={handleSetWallpaper}
        onShutdown={handleShutdown}
        onRestart={handleRestart}
      />

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