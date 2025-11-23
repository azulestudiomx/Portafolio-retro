import React from 'react';
import { IconDoc } from '../icons/OsIcons';
import { jsPDF } from 'jspdf';

export const Resume: React.FC = () => {
  
  const handleDownload = () => {
    const doc = new jsPDF();

    // Configure Retro Typewriter Style (Courier)
    doc.setFont("Courier");
    
    // Header
    doc.setFontSize(24);
    doc.text("Juan Pérez", 20, 25);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'italic');
    doc.text("Ingeniero Frontend Senior", 20, 32);

    // Separator
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    // Content Helper
    let yPos = 50;
    
    const addSection = (title: string) => {
        doc.setFont(undefined, 'bold');
        doc.setFontSize(16);
        doc.text(title, 20, yPos);
        yPos += 10;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(11);
    };

    const addJob = (company: string, years: string, points: string[]) => {
        doc.setFont(undefined, 'bold');
        doc.text(company, 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(years, 150, yPos, { align: 'right' });
        yPos += 6;
        
        points.forEach(p => {
            doc.text(`- ${p}`, 25, yPos);
            yPos += 6;
        });
        yPos += 4;
    };

    // --- EXPERIENCE ---
    addSection("Experiencia");

    addJob(
        "Tech Corp Inc.",
        "1999 - Presente",
        [
            "Construyendo interfaces escalables con React",
            "Migración de sistemas legacy a web moderna",
            "Liderazgo técnico de equipos ágiles"
        ]
    );

    addJob(
        "Soluciones Web Ltd.",
        "1995 - 1999",
        [
            "Maestro HTML/CSS y diseño de tablas",
            "Desarrollo de scripts en Perl CGI",
            "Administración de servidores Linux"
        ]
    );

    // --- EDUCATION ---
    yPos += 5;
    addSection("Educación");

    doc.setFont(undefined, 'bold');
    doc.text("Universidad de Ciencias", 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text("1995", 150, yPos, { align: 'right' });
    yPos += 6;
    doc.text("Lic. Ciencias de la Computación", 25, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.text("Generado automáticamente desde Portafolio Mac OS 8", 105, 280, { align: 'center' });

    doc.save("CV_JuanPerez.pdf");
  };

  return (
    <div className="h-full flex flex-col bg-white text-black font-mono relative">
       {/* Document Header */}
       <div className="absolute top-2 right-4 opacity-10 pointer-events-none">
           <IconDoc className="w-32 h-32" />
       </div>

       <div className="p-4 overflow-y-auto text-sm leading-relaxed z-10 flex-1">
            <h1 className="text-2xl font-bold font-chicago mb-1 border-b-2 border-black pb-1">Juan Pérez</h1>
            <p className="mb-4 text-xs italic">Ingeniero Frontend Senior</p>

            <h2 className="font-bold font-chicago text-lg mt-4 mb-2">Experiencia</h2>
            <div className="mb-3">
                <div className="flex justify-between font-bold">
                    <span>Tech Corp Inc.</span>
                    <span>1999 - Presente</span>
                </div>
                <p className="text-xs ml-4">- Construyendo interfaces escalables con React</p>
                <p className="text-xs ml-4">- Migración de sistemas legacy a web moderna</p>
            </div>

            <div className="mb-3">
                <div className="flex justify-between font-bold">
                    <span>Soluciones Web Ltd.</span>
                    <span>1995 - 1999</span>
                </div>
                <p className="text-xs ml-4">- Maestro HTML/CSS</p>
                <p className="text-xs ml-4">- Scripting en Perl CGI</p>
            </div>

            <h2 className="font-bold font-chicago text-lg mt-4 mb-2">Educación</h2>
            <div>
                <div className="flex justify-between font-bold">
                    <span>Universidad de Ciencias</span>
                    <span>1995</span>
                </div>
                <p className="text-xs ml-4">Lic. Ciencias de la Computación</p>
            </div>
       </div>

       <div className="p-2 border-t border-gray-300 bg-[#f0f0f0] flex justify-center">
            <button 
                onClick={handleDownload}
                className="flex items-center space-x-2 px-3 py-1 border border-black bg-white shadow-[1px_1px_0_#000] active:translate-y-px active:shadow-none hover:bg-gray-100 transition-colors"
                title="Guardar como PDF"
            >
                <IconDoc className="w-4 h-4" />
                <span className="font-chicago text-xs font-bold">Descargar PDF</span>
            </button>
       </div>
    </div>
  );
};