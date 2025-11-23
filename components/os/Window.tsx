
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WindowId, WindowState } from '../../types';
import { playWindowDragSound } from '../../utils/audio';

interface WindowProps {
  window: WindowState;
  onClose: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  onMove: (id: WindowId, x: number, y: number) => void;
  onResize: (id: WindowId, width: number, height: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window: winState, onClose, onFocus, onMove, onResize, children }) => {
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });
  
  // State for shake animation
  const [isShaking, setIsShaking] = useState(false);
  const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // State for focus animation
  const [isFocusAnimating, setIsFocusAnimating] = useState(false);
  const prevZIndex = useRef(winState.zIndex);

  // State for WindowShade (collapsed)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Use a ref for the current window state to access latest values in event listener
  const winStateRef = useRef(winState);
  useEffect(() => {
    winStateRef.current = winState;
  }, [winState]);

  // Trigger focus animation when zIndex increases (window comes to front)
  useEffect(() => {
    if (winState.zIndex > prevZIndex.current) {
      setIsFocusAnimating(true);
      const timer = setTimeout(() => setIsFocusAnimating(false), 200);
      return () => clearTimeout(timer);
    }
    prevZIndex.current = winState.zIndex;
  }, [winState.zIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking through
    onFocus(winState.id);
    // Play sound
    playWindowDragSound();
    
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - winState.position.x,
      y: e.clientY - winState.position.y
    };
  };

  const handleResizeDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onFocus(winState.id);
      
      isResizing.current = true;
      resizeStart.current = {
          x: e.clientX,
          y: e.clientY,
          w: winState.size?.width || 400,
          h: winState.size?.height || 300
      };
  };

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      const currentWin = winStateRef.current;

      // --- RESIZING LOGIC ---
      if (isResizing.current) {
          const deltaX = e.clientX - resizeStart.current.x;
          const deltaY = e.clientY - resizeStart.current.y;
          
          const newWidth = Math.max(250, resizeStart.current.w + deltaX);
          const newHeight = Math.max(150, resizeStart.current.h + deltaY);
          
          onResize(currentWin.id, newWidth, newHeight);
          return; // Stop drag logic if resizing
      }

      // --- DRAGGING LOGIC ---
      if (isDragging.current) {
        // Calculate proposed position
        let newX = e.clientX - dragOffset.current.x;
        let newY = e.clientY - dragOffset.current.y;

        // Boundary Constraints
        const MENU_BAR_HEIGHT = 30;
        const LAUNCHER_HEIGHT = 40; // Approx height
        const minX = 0;
        const minY = MENU_BAR_HEIGHT;
        
        const winWidth = currentWin.size?.width || 400;
        const winHeight = currentWin.size?.height || 300;

        const maxX = window.innerWidth - winWidth;
        const maxY = window.innerHeight - winHeight - LAUNCHER_HEIGHT;

        let hitBoundary = false;

        // Check boundaries and clamp
        if (newX < minX) { newX = minX; hitBoundary = true; }
        if (newX > maxX) { newX = maxX; hitBoundary = true; }
        if (newY < minY) { newY = minY; hitBoundary = true; }
        if (newY > maxY) { newY = maxY; hitBoundary = true; }

        // Trigger shake if hitting boundary
        if (hitBoundary) {
             setIsShaking(prev => {
                 if (!prev) {
                     // Only set timeout if not already shaking to avoid loop/spam
                     if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
                     shakeTimeout.current = setTimeout(() => setIsShaking(false), 300);
                     return true;
                 }
                 return prev;
             });
        }

        onMove(currentWin.id, newX, newY);
      }
    },
    [onMove, onResize]
  );

  const handleGlobalMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    };
  }, [handleGlobalMouseMove]);

  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
  };

  if (!winState.isOpen) return null;

  return (
    <div
      className={`absolute flex flex-col font-chicago shadow-[2px_2px_0px_#000] animate-win-open ${isShaking ? 'animate-shake' : ''} ${isFocusAnimating ? 'animate-win-focus' : ''}`}
      style={{
        left: winState.position.x,
        top: winState.position.y,
        width: winState.size?.width || 400,
        height: isCollapsed ? 'auto' : (winState.size?.height || 300),
        zIndex: winState.zIndex,
        // The Platinum Look borders
        borderTop: '1px solid #fff',
        borderLeft: '1px solid #fff',
        borderRight: '1px solid #404040',
        borderBottom: '1px solid #404040',
        backgroundColor: '#d4d4d4', // Standard Mac gray
        outline: '1px solid #000'
      }}
      onMouseDown={() => onFocus(winState.id)}
    >
      {/* Title Bar */}
      <div
        className="h-6 flex items-center justify-between px-1 select-none cursor-default bg-[#d4d4d4] border-b border-[#808080]"
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
        onDoubleClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2 w-full h-full relative">
            
            {/* Close Box */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(winState.id); }}
                className="w-3 h-3 border border-black bg-white active:bg-black ml-1 relative shadow-[inset_1px_1px_0_#ccc]"
            >
            </button>
            
            {/* Title with Stripes */}
            <div className={`flex-1 flex items-center justify-center h-4 relative ${winState.zIndex >= 10 ? 'title-bar-lines' : ''}`}>
                <span className="bg-[#d4d4d4] px-2 text-sm font-bold text-black relative z-10">
                    {winState.title}
                </span>
            </div>

            {/* Collapse/Zoom Box (Decorative for now, acts as shade trigger) */}
            <div className="flex space-x-1 mr-1" onClick={(e) => {e.stopPropagation(); setIsCollapsed(!isCollapsed);}}>
                 <div className="w-3 h-3 border border-black bg-[#d4d4d4] shadow-[inset_1px_1px_0_#fff] active:bg-gray-400">
                     <div className="w-1.5 h-1.5 border-t border-l border-black m-0.5 opacity-50"></div>
                 </div>
                 <div className="w-3 h-3 border border-black bg-[#d4d4d4] shadow-[inset_1px_1px_0_#fff]">
                     <div className="w-1.5 h-1.5 border border-black m-0.5 opacity-50"></div>
                 </div>
            </div>
        </div>
      </div>

      {/* Window Content Frame - Hidden if collapsed */}
      {!isCollapsed && (
          <div className="flex-1 p-0.5 relative overflow-hidden flex flex-col">
              <div className="bg-white border-t border-l border-[#808080] border-b border-r border-white flex-1 overflow-auto p-2 relative">
                 {children}
              </div>

              {/* Resize Handle (Grow Box) */}
              <div 
                className="absolute bottom-0.5 right-0.5 w-4 h-4 cursor-nwse-resize z-20 bg-[#d4d4d4] border-t border-l border-white"
                onMouseDown={handleResizeDown}
              >
                  {/* Diagonal Lines for Grip */}
                  <svg width="100%" height="100%" viewBox="0 0 16 16">
                      <line x1="4" y1="12" x2="12" y2="4" stroke="#808080" strokeWidth="1" />
                      <line x1="8" y1="12" x2="12" y2="8" stroke="#808080" strokeWidth="1" />
                      <line x1="12" y1="12" x2="12" y2="12" stroke="#808080" strokeWidth="1" />
                  </svg>
              </div>
          </div>
      )}
    </div>
  );
};
