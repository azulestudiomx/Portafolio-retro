
import React, { useRef } from 'react';

interface AppearanceProps {
    onSetWallpaper: (url: string | null) => void;
}

export const Appearance: React.FC<AppearanceProps> = ({ onSetWallpaper }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onSetWallpaper(url);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#d4d4d4] font-chicago p-4">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
            />
            
            <h2 className="text-lg font-bold mb-4 border-b border-gray-400 pb-1">Apariencia</h2>
            
            <div className="flex flex-col items-center">
                <div className="w-48 h-36 bg-gray-700 border-8 border-gray-300 rounded-lg shadow-inner mb-4 relative flex items-center justify-center overflow-hidden">
                     {/* Monitor Preview */}
                     <div className="w-full h-full bg-[#3b5998] flex items-center justify-center">
                         <span className="text-white opacity-50 text-xs">Vista Previa</span>
                     </div>
                     {/* Glare */}
                     <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white to-transparent opacity-10 rounded-bl-full pointer-events-none"></div>
                </div>

                <div className="w-full border border-white border-t-gray-500 border-l-gray-500 bg-gray-200 p-3 mb-4">
                    <p className="text-sm font-bold mb-2">Fondo de Escritorio</p>
                    <p className="text-xs mb-3">Selecciona una imagen para personalizar tu experiencia.</p>
                    
                    <div className="flex space-x-2 justify-center">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-1 border border-black bg-white shadow-[1px_1px_0_#000] active:shadow-none active:translate-y-px text-sm"
                        >
                            Seleccionar Imagen...
                        </button>
                    </div>
                </div>

                <button 
                    onClick={() => onSetWallpaper(null)}
                    className="px-4 py-1 border border-gray-500 bg-[#ccc] shadow-[1px_1px_0_#fff] active:shadow-none active:translate-y-px text-sm"
                >
                    Restablecer Fondo Original
                </button>
            </div>
        </div>
    );
};
