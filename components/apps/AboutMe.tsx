
import React from 'react';

export const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex flex-col font-mono text-sm text-black">
      <div className="flex flex-row space-x-4 mb-4">
        <div className="w-24 h-24 border-2 border-gray-800 shadow-[2px_2px_0_#000] overflow-hidden flex-shrink-0">
          <img 
            src="https://picsum.photos/100/100" 
            alt="Perfil" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold font-chicago mb-2">¡Hola, Mundo!</h1>
          <p className="leading-tight mb-2">
            Soy un Desarrollador Full Stack con pasión por la estética retro y el código limpio.
          </p>
          <p className="leading-tight">
            Con base en el Ciberespacio, creando experiencias web que se sienten nostálgicas y modernas a la vez.
          </p>
        </div>
      </div>
      
      <div className="border border-gray-400 p-2 bg-white h-full overflow-y-auto shadow-inner text-black">
        <h2 className="font-bold underline mb-1">Habilidades:</h2>
        <ul className="list-disc list-inside mb-4">
            <li>React y TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
            <li>Arquitectura de Sistemas</li>
            <li>Diseño Pixel Art</li>
        </ul>
        <div className="text-center mt-4">
            <button className="px-4 py-1 border-2 border-black bg-[#ccc] shadow-[2px_2px_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] font-bold text-black">
                Más Info...
            </button>
        </div>
      </div>
    </div>
  );
};
