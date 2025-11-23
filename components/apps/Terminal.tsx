
import React, { useState, useRef, useEffect } from 'react';
import { WindowId } from '../../types';

interface TerminalProps {
    onOpenWindow: (id: WindowId) => void;
}

interface Line {
    type: 'input' | 'output';
    content: string;
}

export const Terminal: React.FC<TerminalProps> = ({ onOpenWindow }) => {
    const [history, setHistory] = useState<Line[]>([
        { type: 'output', content: 'Mac OS 8 Command Shell [v1.0]' },
        { type: 'output', content: '(c) 1997 Apple Computer, Inc.' },
        { type: 'output', content: 'Escribe "help" o "ayuda" para ver comandos.' },
        { type: 'output', content: '' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        inputRef.current?.focus();
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            processCommand(input);
            setInput('');
        }
    };

    const processCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        const parts = trimmed.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        const newHistory = [...history, { type: 'input' as const, content: cmd }];

        switch (command) {
            case 'help':
            case 'ayuda':
                newHistory.push({ type: 'output', content: 'Comandos disponibles:' });
                newHistory.push({ type: 'output', content: '  ls, dir     - Listar aplicaciones' });
                newHistory.push({ type: 'output', content: '  open [app]  - Abrir aplicación (ej: open paint)' });
                newHistory.push({ type: 'output', content: '  clear       - Limpiar pantalla' });
                newHistory.push({ type: 'output', content: '  whoami      - Usuario actual' });
                newHistory.push({ type: 'output', content: '  date        - Fecha del sistema' });
                newHistory.push({ type: 'output', content: '  reboot      - Reiniciar sistema' });
                break;
            
            case 'ls':
            case 'dir':
                newHistory.push({ type: 'output', content: 'Aplicaciones instaladas:' });
                newHistory.push({ type: 'output', content: '  about      projects    contact' });
                newHistory.push({ type: 'output', content: '  resume     paint       music' });
                newHistory.push({ type: 'output', content: '  browser    terminal' });
                break;

            case 'open':
            case 'abrir':
                if (args.length === 0) {
                    newHistory.push({ type: 'output', content: 'Uso: open [nombre_app]' });
                } else {
                    const target = args[0].toLowerCase();
                    const map: Record<string, WindowId> = {
                        'about': 'about', 'sobremi': 'about',
                        'projects': 'projects', 'proyectos': 'projects',
                        'contact': 'contact', 'contacto': 'contact',
                        'resume': 'resume', 'cv': 'resume',
                        'paint': 'gallery', 'gallery': 'gallery', 'macpaint': 'gallery',
                        'music': 'music', 'cd': 'music',
                        'browser': 'browser', 'internet': 'browser', 'netscape': 'browser',
                        'terminal': 'terminal'
                    };

                    if (map[target]) {
                        newHistory.push({ type: 'output', content: `Abriendo ${target}...` });
                        onOpenWindow(map[target]);
                    } else {
                        newHistory.push({ type: 'output', content: `Error: No se encontró la aplicación "${target}"` });
                    }
                }
                break;

            case 'clear':
            case 'limpiar':
                setHistory([]);
                return; // Return early to avoid setting state with old lines

            case 'whoami':
                newHistory.push({ type: 'output', content: 'guest@macos8' });
                break;
            
            case 'echo':
                newHistory.push({ type: 'output', content: args.join(' ') });
                break;

            case 'date':
                newHistory.push({ type: 'output', content: new Date().toString() });
                break;

            case 'reboot':
                window.location.reload();
                break;

            case '':
                break;

            default:
                newHistory.push({ type: 'output', content: `Comando no reconocido: ${command}` });
        }

        setHistory(newHistory);
    };

    return (
        <div 
            className="h-full bg-black text-[#00ff00] font-mono text-xs p-2 overflow-y-auto selection:bg-[#00ff00] selection:text-black"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">
                    {line.type === 'input' ? (
                        <span className="font-bold text-white mr-2">{'>'} {line.content}</span>
                    ) : (
                        <span>{line.content}</span>
                    )}
                </div>
            ))}
            
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">{'>'}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-[#00ff00] font-mono"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
