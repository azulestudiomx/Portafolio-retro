
import React, { useState, useEffect } from 'react';

interface BrowserProps {
  initialUrl?: string;
  onSetLoading?: (loading: boolean) => void;
}

// Helper for toolbar buttons
const ToolbarButton: React.FC<{ label: string; onClick?: () => void; disabled?: boolean }> = ({ label, onClick, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1 border-2 border-[#b0b0b0] bg-[#d4d4d4] text-xs font-bold font-sans shadow-[inset_1px_1px_0_#fff,1px_1px_0_#000] active:shadow-[inset_1px_1px_0_#000] active:bg-[#c0c0c0] mb-1 mr-1 ${disabled ? 'text-gray-500 shadow-none' : 'text-black'}`}
    >
        {label}
    </button>
);

export const Browser: React.FC<BrowserProps> = ({ initialUrl, onSetLoading }) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl || 'about:blank');
  const [inputUrl, setInputUrl] = useState(initialUrl || 'about:blank');
  const [isLoading, setIsLoading] = useState(true);

  // Sync internal loading state with global cursor
  useEffect(() => {
    onSetLoading?.(isLoading);
    // Cleanup ensures cursor resets if component unmounts while loading
    return () => onSetLoading?.(false); 
  }, [isLoading, onSetLoading]);

  // Handle external prop changes (e.g. clicking "Open Website" in Projects)
  useEffect(() => {
      if (initialUrl) {
          setCurrentUrl(initialUrl);
          // Input will be synced via the dependency on currentUrl below or directly here
          setIsLoading(true);
      }
  }, [initialUrl]);

  // Sync input box whenever the active URL changes
  useEffect(() => {
      setInputUrl(currentUrl);
  }, [currentUrl]);

  const handleReload = () => {
      setIsLoading(true);
      const iframe = document.getElementById('netscape-frame') as HTMLIFrameElement;
      if (iframe) {
          // Force reload hack
          iframe.src = iframe.src;
      }
  };

  const handleGo = (e: React.FormEvent) => {
      e.preventDefault();
      // Ensure protocol
      let urlToLoad = inputUrl;
      if (!urlToLoad.startsWith('http') && !urlToLoad.startsWith('about:')) {
          urlToLoad = `https://${urlToLoad}`;
      }
      setCurrentUrl(urlToLoad);
      setIsLoading(true);
  };

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
      setIsLoading(false);
      
      // Try to sync URL from iframe if Same-Origin Policy allows it
      try {
          const iframe = e.currentTarget;
          const frameLocation = iframe.contentWindow?.location.href;
          if (frameLocation && frameLocation !== 'about:blank') {
              setInputUrl(frameLocation);
              // We don't set currentUrl here to avoid a re-render loop, 
              // just the input display
          }
      } catch (err) {
          // Blocked by Cross-Origin policy (expected for external sites like Wikipedia)
          // Cannot read URL from different domain.
      }
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] border-2 border-[#808080] overflow-hidden font-sans">
      
      {/* Top Toolbar Area */}
      <div className="p-1 border-b border-[#808080]">
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap mb-1">
            <ToolbarButton label="Atrás" disabled />
            <ToolbarButton label="Adelante" disabled />
            <ToolbarButton label="Inicio" onClick={() => setCurrentUrl(initialUrl || 'about:blank')} />
            <ToolbarButton label="Recargar" onClick={handleReload} />
            <ToolbarButton label="Imágenes" disabled />
            <ToolbarButton label="Abrir" />
            <ToolbarButton label="Imprimir" disabled />
            <ToolbarButton label="Buscar" />
            <ToolbarButton label="Stop" onClick={() => setIsLoading(false)} />
          </div>

          {/* Location Bar */}
          <div className="flex items-center space-x-2 bg-[#d4d4d4] p-1 border-2 border-[#808080] shadow-inner">
             <span className="text-xs font-bold text-black">Netsite:</span>
             <form onSubmit={handleGo} className="flex-1">
                <input 
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full h-5 bg-white border border-[#808080] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] px-1 text-xs font-mono text-black outline-none"
                />
             </form>
             
             {/* Animated Logo */}
             <div className="w-6 h-6 bg-black relative overflow-hidden border-2 border-[#808080] shadow-inner">
                {isLoading ? (
                    <div className="absolute inset-0 bg-teal-700 animate-pulse flex items-center justify-center">
                        <span className="text-white font-bold text-lg animate-spin">N</span>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-teal-900 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                )}
             </div>
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative border-t border-black">
        {currentUrl ? (
             <iframe 
                id="netscape-frame"
                src={currentUrl} 
                className="w-full h-full border-none"
                title="Netscape Browser"
                onLoad={handleIframeLoad}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
             />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-xs">
                Bienvenido a Netscape Navigator
            </div>
        )}
        
        {/* Retro Overlay for immersion */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_2px] z-10 opacity-30"></div>
      </div>
      
      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 shadow-inner">
         {isLoading ? (
            <div className="flex items-center space-x-2">
                 <div className="w-10 h-2 bg-gray-400 border border-gray-600 relative overflow-hidden">
                     <div className="h-full bg-blue-800 w-1/2 animate-ping"></div>
                 </div>
                 <span className="text-[10px] font-chicago text-black">Conectando al host {inputUrl.substring(0, 30)}...</span>
            </div>
         ) : (
            <span className="text-[10px] font-chicago text-black">Documento: Hecho.</span>
         )}
      </div>
    </div>
  );
};
