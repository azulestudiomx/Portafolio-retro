
import React from 'react';
import { IconMail } from '../icons/OsIcons';

export const Contact: React.FC = () => {
  return (
    <div className="h-full flex flex-col font-chicago bg-[#d4d4d4] p-3 select-none">
      
      {/* Profile Card Header */}
      <div className="bg-white border border-black p-4 mb-4 shadow-[2px_2px_0_rgba(0,0,0,0.2)] flex items-center space-x-4 relative overflow-hidden">
        {/* Decorative background pattern for card */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-100 rounded-bl-full z-0"></div>
        
        <div className="w-16 h-16 bg-gray-200 border-2 border-gray-800 flex items-center justify-center shadow-inner z-10 shrink-0">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-500" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        
        <div className="z-10 flex flex-col justify-center">
            <h2 className="text-xl font-bold leading-none mb-1">Juan Pérez</h2>
            <p className="text-xs font-mono text-gray-600 mb-0.5">Full Stack Developer</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Macintosh User</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-3 justify-center">
          
          {/* GitHub Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 border-2 border-[#808080] border-t-white border-l-white bg-[#d4d4d4] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:bg-[#c0c0c0] hover:bg-[#e0e0e0] text-black no-underline shadow-sm transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 mr-3 flex items-center justify-center border border-gray-500 bg-white group-active:translate-x-[1px] group-active:translate-y-[1px]">
                 <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 012.5-.34c.85.01 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
            </div>
            <div className="flex flex-col group-active:translate-x-[1px] group-active:translate-y-[1px]">
                <span className="font-bold text-sm">GitHub</span>
                <span className="text-[10px] text-gray-600 font-mono">Ver Repositorios</span>
            </div>
            <div className="ml-auto text-gray-400 group-hover:text-black group-active:translate-x-[1px] group-active:translate-y-[1px]">
                ➦
            </div>
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 border-2 border-[#808080] border-t-white border-l-white bg-[#d4d4d4] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:bg-[#c0c0c0] hover:bg-[#e0e0e0] text-black no-underline shadow-sm transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 mr-3 flex items-center justify-center border border-gray-500 bg-white group-active:translate-x-[1px] group-active:translate-y-[1px]">
                 <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0077b5]" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <div className="flex flex-col group-active:translate-x-[1px] group-active:translate-y-[1px]">
                <span className="font-bold text-sm">LinkedIn</span>
                <span className="text-[10px] text-gray-600 font-mono">Conectar Profesional</span>
            </div>
            <div className="ml-auto text-gray-400 group-hover:text-black group-active:translate-x-[1px] group-active:translate-y-[1px]">
                ➦
            </div>
          </a>

          {/* Email Button */}
          <a
            href="mailto:tu-email@ejemplo.com"
            className="group flex items-center px-2 py-2 border-2 border-[#808080] border-t-white border-l-white bg-[#d4d4d4] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:bg-[#c0c0c0] hover:bg-[#e0e0e0] text-black no-underline shadow-sm transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 mr-3 flex items-center justify-center border border-gray-500 bg-white group-active:translate-x-[1px] group-active:translate-y-[1px]">
                <IconMail className="w-6 h-6" />
            </div>
            <div className="flex flex-col group-active:translate-x-[1px] group-active:translate-y-[1px]">
                <span className="font-bold text-sm">Email</span>
                <span className="text-[10px] text-gray-600 font-mono">Enviar Correo</span>
            </div>
            <div className="ml-auto text-gray-400 group-hover:text-black group-active:translate-x-[1px] group-active:translate-y-[1px]">
                @
            </div>
          </a>

      </div>
      
      <div className="mt-3 text-center">
          <p className="text-[10px] text-gray-500 font-mono">
              Haz clic para abrir el enlace externo.
          </p>
      </div>
    </div>
  );
};
