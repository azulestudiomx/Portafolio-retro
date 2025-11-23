
import React, { useState } from 'react';
import { ProjectData } from '../../types';
import { IconFolder } from '../icons/OsIcons';

interface ProjectsProps {
    onOpenBrowser: (url: string, title: string) => void;
    onSetLoading?: (loading: boolean) => void;
}

const PROJECTS: ProjectData[] = [
  { 
    id: 1, 
    name: "Portafolio Retro", 
    date: "28 Oct, 2023", 
    stack: "React, Tailwind", 
    description: "Un clon de Mac OS 8 construido con tecnologías web modernas. Cuenta con sistema de ventanas y drag & drop.", 
    imageUrl: "https://picsum.photos/seed/retro/300/200",
    url: "https://es.wikipedia.org/wiki/Mac_OS_8" 
  },
  { 
    id: 2, 
    name: "API E-Commerce", 
    date: "15 Sep, 2023", 
    stack: "Node.js, Express", 
    description: "Backend escalable para tiendas online con autenticación JWT y pagos con Stripe.",
    imageUrl: "https://picsum.photos/seed/api/300/200",
    url: "https://example.com"
  },
  { 
    id: 3, 
    name: "Chat Bot IA", 
    date: "02 Ago, 2023", 
    stack: "Python, OpenAI", 
    description: "Asistente inteligente de servicio al cliente capaz de responder preguntas frecuentes.",
    imageUrl: "https://picsum.photos/seed/bot/300/200",
    url: "https://es.wikipedia.org/wiki/Inteligencia_artificial"
  },
  { 
    id: 4, 
    name: "Panel de Datos", 
    date: "10 Jul, 2023", 
    stack: "D3.js, Vue", 
    description: "Dashboard de análisis en tiempo real para visualización de métricas financieras.",
    imageUrl: "https://picsum.photos/seed/data/300/200",
    url: "https://es.wikipedia.org/wiki/Visualizaci%C3%B3n_de_datos"
  },
  { 
    id: 5, 
    name: "Juego Móvil", 
    date: "20 Jun, 2023", 
    stack: "Unity, C#", 
    description: "Plataformas estilo pixel art para iOS con físicas personalizadas.",
    imageUrl: "https://picsum.photos/seed/game/300/200",
    url: "https://es.wikipedia.org/wiki/Unity_(motor_de_juego)"
  },
];

export const Projects: React.FC<ProjectsProps> = ({ onOpenBrowser, onSetLoading }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  const handleSelect = (id: number) => {
      setSelectedId(id);
      if (onSetLoading) {
          onSetLoading(true);
          // Simulate brief fetch time for better feel
          setTimeout(() => onSetLoading(false), 250);
      }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Finder Top Info */}
      <div className="flex items-center text-xs mb-2 text-gray-600 border-b border-gray-300 pb-1 font-chicago bg-[#d4d4d4] px-2 sticky top-0">
        <span>{PROJECTS.length} ítems</span>
        <span className="mx-2">|</span>
        <span>250 MB disponibles</span>
      </div>

      {/* List Header */}
      <div className="flex text-xs font-bold border-b border-black bg-[#e0e0e0] py-1 font-chicago select-none">
        <div className="w-1/2 pl-2 border-r border-gray-400 text-black">Nombre</div>
        <div className="w-1/4 pl-2 border-r border-gray-400 text-black">Fecha Modificación</div>
        <div className="w-1/4 pl-2 text-black">Tipo</div>
      </div>

      {/* List Body */}
      <div className="flex-1 bg-white overflow-y-auto font-mono text-sm min-h-[100px]">
        <table className="w-full border-collapse">
            <tbody>
                {PROJECTS.map((project) => (
                    <tr 
                        key={project.id}
                        className={`cursor-pointer select-none ${selectedId === project.id ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}`}
                        onClick={() => handleSelect(project.id)}
                        onDoubleClick={() => {
                            if(project.url) onOpenBrowser(project.url, `Netscape - ${project.name}`);
                        }}
                    >
                        <td className="w-1/2 py-1 pl-1 flex items-center">
                             {selectedId === project.id ? 
                                <IconFolder className="w-4 h-4 mr-2 invert" /> :
                                <IconFolder className="w-4 h-4 mr-2" />
                             }
                            <span className="truncate">{project.name}</span>
                        </td>
                        <td className="w-1/4 py-1 pl-2 border-l border-dotted border-gray-300">
                            {project.date}
                        </td>
                        <td className="w-1/4 py-1 pl-2 border-l border-dotted border-gray-300">
                            {project.stack}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Preview Pane */}
      {selectedProject && (
          <div className="border-t border-white shadow-[0_-1px_0_#808080] bg-[#d4d4d4] p-1 h-56 flex flex-col shrink-0 transition-all">
                 <div className="flex flex-row h-full">
                    {/* Screenshot Container */}
                    <div className="w-48 h-full flex flex-col mr-3 pb-2">
                        <div className="flex-1 bg-black border-b border-r border-white border-t border-l border-[#808080] relative p-0.5 group overflow-hidden">
                            <img 
                            src={selectedProject.imageUrl} 
                            alt="Vista previa" 
                            className="w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                            style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                        <span className="text-[10px] text-center font-chicago mt-1 text-black">Vista Previa</span>
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1 overflow-y-auto border border-dotted border-gray-500 bg-[#e8e8e8] p-2 shadow-inner text-black flex flex-col relative">
                        <h4 className="font-bold font-chicago text-sm mb-2 border-b border-gray-400 pb-1">
                            {selectedProject.name}
                        </h4>
                        
                        <div className="mb-2">
                            <span className="text-[10px] uppercase font-bold text-gray-600 block">Tecnología</span>
                            <span className="text-xs font-mono">{selectedProject.stack}</span>
                        </div>
                        
                        <div className="flex-1">
                            <span className="text-[10px] uppercase font-bold text-gray-600 block">Descripción</span>
                            <p className="text-xs font-mono leading-tight">
                                {selectedProject.description}
                            </p>
                        </div>
                        
                        <div className="mt-3 text-right sticky bottom-0">
                            <button 
                                onClick={() => {
                                    if(selectedProject.url) onOpenBrowser(selectedProject.url, `Netscape - ${selectedProject.name}`);
                                }}
                                className="bg-[#ccc] border-2 border-[#808080] border-t-white border-l-white px-3 py-1 text-xs font-chicago active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:bg-[#bbb] flex items-center ml-auto shadow-sm hover:bg-[#d0d0d0]"
                            >
                                <span className="mr-1">🌐</span> Ver Sitio Web
                            </button>
                        </div>
                    </div>
                 </div>
          </div>
      )}
    </div>
  );
};
