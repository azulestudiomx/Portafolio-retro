import React from 'react';
import { IconDoc } from '../icons/OsIcons';
import { jsPDF } from 'jspdf';

export const Resume: React.FC = () => {

    // -- PARA CAMBIAR EL TEXTO DEL PDF, EDITA AQUÍ --
    const handleDownload = () => {
        const doc = new jsPDF();

        // Configure Retro Typewriter Style (Courier)
        doc.setFont("Courier");

        // Header
        doc.setFontSize(24);
        doc.text("Carlos Caceres", 20, 25);

        doc.setFontSize(12);
        doc.setFont(undefined, 'italic');
        doc.text("Azul Estudio - Developer & Diseñador", 20, 32);

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
        addSection("Experiencia Profesional");

        addJob(
            "Azul Estudio",
            "2020 - Presente",
            [
                "Fundador y Director Creativo",
                "Desarrollo de identidades visuales y web apps",
                "Gestión de proyectos full-cycle"
            ]
        );

        addJob(
            "Agencia Digital Global",
            "2018 - 2020",
            [
                "Desarrollador Frontend Senior",
                "Implementación de Design Systems",
            ]
        );

        // --- EDUCATION ---
        yPos += 5;
        addSection("Educación");

        doc.setFont(undefined, 'bold');
        doc.text("Universidad Tecnológica", 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.text("2018", 150, yPos, { align: 'right' });
        yPos += 6;
        doc.text("Ingeniería de Software", 25, yPos);

        // Footer
        doc.setFontSize(8);
        doc.text("Generado desde Azul Estudio OS", 105, 280, { align: 'center' });

        doc.save("CV_CarlosCaceres.pdf");
    };

    // -- PARA CAMBIAR EL TEXTO VISIBLE EN LA VENTANA, EDITA AQUÍ ABAJO --
    return (
        <div className="h-full flex flex-col bg-white text-black font-mono relative">
            {/* Document Header */}
            <div className="absolute top-2 right-4 opacity-10 pointer-events-none">
                <IconDoc className="w-32 h-32" />
            </div>

            <div className="p-4 overflow-y-auto text-sm leading-relaxed z-10 flex-1">
                <h1 className="text-2xl font-bold font-chicago mb-1 border-b-2 border-black pb-1">Carlos Caceres</h1>
                <p className="mb-4 text-xs italic">Azul Estudio - Developer & Diseñador</p>

                <h2 className="font-bold font-chicago text-lg mt-4 mb-2">Experiencia Profesional</h2>
                <div className="mb-3">
                    <div className="flex justify-between font-bold">
                        <span>Azul Estudio</span>
                        <span>2020 - Presente</span>
                    </div>
                    <p className="text-xs ml-4">- Fundador y Director Creativo</p>
                    <p className="text-xs ml-4">- Desarrollo de identidades visuales y web apps</p>
                </div>

                <div className="mb-3">
                    <div className="flex justify-between font-bold">
                        <span>Grupo Diseña</span>
                        <span>2006 - 2012</span>
                    </div>
                    <p className="text-xs ml-4">- Desarrollador Frontend</p>
                    <p className="text-xs ml-4">- Implementación y Diseño</p>
                </div>

                <h2 className="font-bold font-chicago text-lg mt-4 mb-2">SAFIN</h2>
                <div>
                    <div className="flex justify-between font-bold">
                        <span>Unidad de Producción y Diseño</span>
                        <span>2013- Vigente</span>
                    </div>
                    <p className="text-xs ml-4">Diseño Gráfico</p>
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