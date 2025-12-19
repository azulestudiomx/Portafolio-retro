
import { IconData, WindowState, ProjectData } from './types';

// Dimensions for the About window to calculate centering
const ABOUT_WIDTH = 600;
const ABOUT_HEIGHT = 450;

export const INITIAL_WINDOWS: WindowState[] = [
    {
        id: 'about',
        title: 'Sobre Mí',
        isOpen: true,
        zIndex: 1,
        // Dynamic centering logic
        position: {
            x: Math.max(0, (window.innerWidth - ABOUT_WIDTH) / 2),
            y: Math.max(0, (window.innerHeight - ABOUT_HEIGHT) / 2)
        },
        size: { width: ABOUT_WIDTH, height: ABOUT_HEIGHT }
    },
    { id: 'projects', title: 'Proyectos', isOpen: false, zIndex: 0, position: { x: 80, y: 60 }, size: { width: 720, height: 480 } },
    { id: 'contact', title: 'Contacto', isOpen: false, zIndex: 0, position: { x: 150, y: 150 }, size: { width: 420, height: 450 } },
    { id: 'resume', title: 'Curriculum.txt', isOpen: false, zIndex: 0, position: { x: 200, y: 60 }, size: { width: 450, height: 500 } },
    { id: 'gallery', title: 'MacPaint', isOpen: false, zIndex: 0, position: { x: 300, y: 100 }, size: { width: 600, height: 450 } },
    { id: 'browser', title: 'Netscape Navigator', isOpen: false, zIndex: 0, position: { x: 60, y: 60 }, size: { width: 850, height: 600 } },
    { id: 'appearance', title: 'Apariencia', isOpen: false, zIndex: 0, position: { x: 100, y: 100 }, size: { width: 400, height: 350 } },
    { id: 'ai', title: 'Asistente IA', isOpen: false, zIndex: 0, position: { x: 120, y: 80 }, size: { width: 380, height: 500 } },
    { id: 'terminal', title: 'Terminal', isOpen: false, zIndex: 0, position: { x: 150, y: 150 }, size: { width: 600, height: 400 } },

];

// Initial layout resembling a column on the left
export const DESKTOP_ICONS: IconData[] = [
    { id: 'about', title: 'Sobre Mí', iconType: 'disk', position: { x: 20, y: 40 } },
    { id: 'projects', title: 'Proyectos', iconType: 'folder', position: { x: 20, y: 130 } },
    { id: 'resume', title: 'Currículum', iconType: 'doc', position: { x: 20, y: 220 } },
    { id: 'contact', title: 'Contacto', iconType: 'mail', position: { x: 20, y: 310 } },
    { id: 'gallery', title: 'MacPaint', iconType: 'paint', position: { x: 20, y: 400 } },
    { id: 'appearance', title: 'Apariencia', iconType: 'settings', position: { x: 20, y: 490 } },
    { id: 'ai', title: 'Asistente IA', iconType: 'assistant', position: { x: 20, y: 580 } },
    { id: 'terminal', title: 'Terminal', iconType: 'terminal', position: { x: 110, y: 40 } },
];

// --- EDITA ESTA LISTA PARA CAMBIAR TUS PROYECTOS ---
// Puedes agregar más objetos aquí. Asegúrate de que el 'id' sea único.
// Para usar tus propias imágenes, reemplaza 'imageUrl' con la URL de tu imagen en Cloudinary u otro servicio.
export const PROJECTS: ProjectData[] = [
    {
        id: 1,
        name: "VETORA - Sistema Integral de Gestión Veterinaria",
        date: "28 Oct, 2025",
        stack: "React, Tailwind, Expedientes",
        description: "Sistema Integral de Gestión Veterinaria.",
        imageUrl: "https://res.cloudinary.com/dt96yonq2/image/upload/v1766068499/VETORA_kcmrto.jpg", // <--- CAMBIA ESTO CON TU URL DE CLOUDINARY
        url: "https://vetora.azulestudiomx.cloud/"
    },
    {
        id: 2,
        name: "Sistema Emplacados Campeche",
        date: "15 Sep, 2025",
        stack: "Node.js, MongoDB, Express, React",
        description: "Sistema de gestión para la empresa Emplacados Campeche.",
        imageUrl: "https://res.cloudinary.com/dt96yonq2/image/upload/v1766084934/siecamp_y4e5ny.jpg", // <--- CAMBIA ESTO CON TU URL DE CLOUDINARY
        url: "https://siecamp.azulestudiomx.cloud/"
    },
    {
        id: 3,
        name: "Sistema de Gestión de Citas Médicas-Expedientes",
        date: "10 Jul, 2024",
        stack: "php, mysql, bootstrap",
        description: "Gestión de citas médicas y expedientes electrónica.",
        imageUrl: "https://res.cloudinary.com/dt96yonq2/image/upload/v1766086594/expedi_hnczg0.jpg", // <--- CAMBIA ESTO CON TU URL DE CLOUDINARY
        url: "https://joaquinbenitezlandero.cloud/version2/expedientes-medicos"
    },
    {
        id: 4,
        name: "Web Maquena",
        date: "20 Jun, 2024",
        stack: "Wordpress, Elementor",
        description: "Web de la empresa Maquena Arquitectura.",
        imageUrl: "https://picsum.photos/seed/game/300/200", // <--- CAMBIA ESTO CON TU URL DE CLOUDINARY
        url: "https://maquena.com.mx"
    },
];