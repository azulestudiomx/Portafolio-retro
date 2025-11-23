
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { IconData, WindowId } from '../../types';
import { IconFolder, IconDisk, IconDoc, IconMail, IconPic, IconBrush, IconCD, IconTerminal, IconSettings, IconMagic } from '../icons/OsIcons';

interface DesktopIconProps {
  icon: IconData;
  onOpen: (id: WindowId) => void;
  onMove: (id: WindowId, x: number, y: number) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onOpen, onMove }) => {
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(false);

  const getIcon = () => {
    switch (icon.iconType) {
      case 'folder': return <IconFolder className="w-10 h-10" />;
      case 'disk': return <IconDisk className="w-10 h-10" />;
      case 'doc': return <IconDoc className="w-10 h-10" />;
      case 'mail': return <IconMail className="w-10 h-10" />;
      case 'pic': return <IconPic className="w-10 h-10" />;
      case 'paint': return <IconBrush className="w-10 h-10" />;
      case 'music': return <IconCD className="w-10 h-10" />;
      case 'terminal': return <IconTerminal className="w-10 h-10" />;
      case 'settings': return <IconSettings className="w-10 h-10" />;
      case 'assistant': return <IconMagic className="w-10 h-10" />;
      default: return <IconFolder className="w-10 h-10" />;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSelected(true);
      isDragging.current = true;
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      dragOffset.current = {
          x: e.clientX - icon.position.x,
          y: e.clientY - icon.position.y
      };
  };

  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
      if (isDragging.current) {
          const newX = e.clientX - dragOffset.current.x;
          const newY = e.clientY - dragOffset.current.y;
          onMove(icon.id, newX, newY);
      }
  }, [icon.id, onMove]);

  const handleGlobalMouseUp = useCallback((e: MouseEvent) => {
      if(isDragging.current) {
          isDragging.current = false;
      }
  }, []);

  // Handle outside click to deselect
  useEffect(() => {
      const handleOutsideClick = () => setIsSelected(false);
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
          document.removeEventListener('mousemove', handleGlobalMouseMove);
          document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
  }, [handleGlobalMouseMove, handleGlobalMouseUp]);

  const handleDoubleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onOpen(icon.id);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-20 cursor-pointer group absolute"
      style={{ left: icon.position.x, top: icon.position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="mb-1 relative">
         {isSelected && <div className="absolute inset-0 bg-black opacity-20 rounded-sm pointer-events-none mix-blend-multiply" />}
         {getIcon()}
      </div>
      <div className={`border border-dotted px-1 ${isSelected ? 'bg-black border-black' : 'bg-white border-white group-hover:bg-black group-hover:border-black'}`}>
        <span className={`text-xs font-chicago font-bold ${isSelected ? 'text-white' : 'text-black group-hover:text-white'}`}>
          {icon.title}
        </span>
      </div>
    </div>
  );
};