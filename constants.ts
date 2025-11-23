
import { IconData, WindowState } from './types';

export const INITIAL_WINDOWS: WindowState[] = [
    { id: 'about', title: 'Sobre Mí', isOpen: true, zIndex: 1, position: { x: 50, y: 50 }, size: { width: 500, height: 420 } },
    { id: 'projects', title: 'Proyectos', isOpen: false, zIndex: 0, position: { x: 100, y: 80 }, size: { width: 500, height: 350 } },
    { id: 'contact', title: 'Contacto', isOpen: false, zIndex: 0, position: { x: 150, y: 150 }, size: { width: 420, height: 450 } },
    { id: 'resume', title: 'Curriculum.txt', isOpen: false, zIndex: 0, position: { x: 200, y: 60 }, size: { width: 450, height: 500 } },
    { id: 'gallery', title: 'MacPaint', isOpen: false, zIndex: 0, position: { x: 300, y: 100 }, size: { width: 600, height: 450 } },
    { id: 'browser', title: 'Netscape Navigator', isOpen: false, zIndex: 0, position: { x: 60, y: 60 }, size: { width: 600, height: 450 } },
    { id: 'music', title: 'Audio Player', isOpen: false, zIndex: 0, position: { x: 400, y: 200 }, size: { width: 350, height: 200 } },
    { id: 'terminal', title: 'Terminal', isOpen: false, zIndex: 0, position: { x: 100, y: 100 }, size: { width: 500, height: 350 } },
];

// Initial layout resembling a column on the left
export const DESKTOP_ICONS: IconData[] = [
    { id: 'about', title: 'Sobre Mí', iconType: 'disk', position: { x: 20, y: 40 } },
    { id: 'projects', title: 'Proyectos', iconType: 'folder', position: { x: 20, y: 130 } },
    { id: 'resume', title: 'Currículum', iconType: 'doc', position: { x: 20, y: 220 } },
    { id: 'contact', title: 'Contacto', iconType: 'mail', position: { x: 20, y: 310 } },
    { id: 'gallery', title: 'MacPaint', iconType: 'paint', position: { x: 20, y: 400 } },
    { id: 'music', title: 'CD Player', iconType: 'music', position: { x: window.innerWidth - 100, y: window.innerHeight - 100 } },
];