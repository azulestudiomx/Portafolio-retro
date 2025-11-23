import React from 'react';

export const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex flex-col font-mono text-sm text-black">
      <div className="flex flex-row space-x-4 mb-4">
        <div className="w-24 h-24 border-2 border-gray-800 shadow-[2px_2px_0_#000] overflow-hidden flex-shrink-0">
          <img 
            src="https://picsum.photos/100/100" 
            alt="Carlos Caceres" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold font-chicago mb-2">Carlos Caceres</h1>
          <p className="leading-tight mb-2">
            Fundador de <strong>Azul Estudio</strong>. Desarrollador creativo obsesionado con los detalles.
          </p>
          <p className="leading-tight">
            Creo experiencias digitales únicas que fusionan diseño atemporal con tecnología moderna.
          </p>
        </div>
      </div>
      
      <div className="border border-gray-400 p-2 bg-white h-full overflow-y-auto shadow-inner text-black">
        <h2 className="font-bold underline mb-1">Especialidades:</h2>
        <ul className="list-disc list-inside mb-4">
            <li>Dirección de Arte Digital</li>
            <li>Desarrollo Frontend (React/TS)</li>
            <li>Experiencia de Usuario (UX)</li>
            <li>Diseño de Interfaces Retro</li>
        </ul>
        <div className="text-center mt-4">
            <p className="text-xs italic">"Diseñando el futuro con píxeles del pasado."</p>
        </div>
      </div>
    </div>
  );
};