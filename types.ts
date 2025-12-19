
export type WindowId = 'about' | 'projects' | 'contact' | 'resume' | 'gallery' | 'browser' | 'music' | 'terminal' | 'appearance' | 'laser' | 'stickies';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  contentProps?: any; // Generic prop to pass data (like URL) to the window content
}

export interface IconData {
  id: WindowId;
  title: string;
  iconType: 'folder' | 'disk' | 'doc' | 'mail' | 'pic' | 'paint' | 'music' | 'terminal' | 'settings' | 'stickies';
  position: { x: number; y: number };
}

export interface ProjectData {
  id: number;
  name: string;
  date: string;
  stack: string;
  description: string;
  imageUrl?: string;
  url?: string;
}