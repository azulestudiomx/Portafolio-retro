import React from 'react';
import { WindowId } from '../../types';
import { IconFolder, IconMail, IconBrush, IconDoc } from '../icons/OsIcons';

interface LauncherProps {
    onOpen: (id: WindowId) => void;
}

export const Launcher: React.FC<LauncherProps> = ({ onOpen }) => {
    
    const items: { id: WindowId, icon: React.ReactNode, label: string }[] = [
        { id: 'projects', icon: <IconFolder className="w-6 h-6"/>, label: "Proyectos" },
        { id: 'contact', icon: <IconMail className="w-6 h-6"/>, label: "Correo" },
        { id: 'gallery', icon: <IconBrush className="w-6 h-6"/>, label: "Paint" },
        { id: 'resume', icon: <IconDoc className="w-6 h-6"/>, label: "CV" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] h-10 bg-[#e0d0e0] border-t border-white shadow-[0_-2px_4px_rgba(0,0,0,0.2)] flex items-center px-2 space-x-2">
            <div className="h-full flex items-center px-2 bg-[#d0b0d0] border-r border-[#a080a0] shadow-inner">
                <span className="font-chicago text-xs font-bold text-gray-700 writing-mode-vertical">Launcher</span>
            </div>
            
            {items.map((item) => (
                <button 
                    key={item.id}
                    onClick={() => onOpen(item.id)}
                    className="w-8 h-8 flex items-center justify-center border border-transparent hover:border-black active:bg-[#c0a0c0] hover:shadow-lg transition-all"
                    title={item.label}
                >
                    {item.icon}
                </button>
            ))}
        </div>
    )
}