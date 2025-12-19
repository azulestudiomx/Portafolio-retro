import React, { useState, useEffect } from 'react';

interface Note {
    id: string;
    text: string;
    color: string;
}

const COLORS = ['#fff740', '#40fff7', '#ff40f7', '#7cff40'];

export const Stickies: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('retro-stickies');
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load stickies", e);
            }
        } else {
            // Default welcome note
            setNotes([{
                id: Date.now().toString(),
                text: "¡Bienvenido a Notas! Escribe tus pendientes aquí.",
                color: '#fff740'
            }]);
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('retro-stickies', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            text: '',
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
        setNotes([...notes, newNote]);
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const updateNote = (id: string, text: string) => {
        setNotes(notes.map(n => n.id === id ? { ...n, text } : n));
    };

    return (
        <div className="h-full bg-[#d4d4d4] font-chicago p-4 overflow-y-auto flex flex-col items-center">
            {/* Toolbar */}
            <div className="w-full max-w-md flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
                <span className="font-bold text-sm">Mis Notas ({notes.length})</span>
                <button
                    onClick={addNote}
                    className="px-3 py-1 border border-black bg-white shadow-[2px_2px_0_black] active:translate-y-px active:shadow-none text-xs font-bold flex items-center gap-1"
                >
                    <span>+</span> Nueva Nota
                </button>
            </div>

            {/* Notes Grid */}
            <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="relative p-0 flex flex-col shadow-[4px_4px_5px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: note.color, minHeight: '180px' }}
                    >
                        {/* Note Header / Tape */}
                        <div className="h-6 w-full opacity-50 bg-black/10 flex justify-end px-1 items-center cursor-move">
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="text-[10px] font-bold text-black/50 hover:text-red-600 px-1"
                                title="Eliminar nota"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Note Content */}
                        <textarea
                            value={note.text}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            className="flex-1 w-full bg-transparent resize-none p-3 text-sm font-handwriting outline-none border-none placeholder-black/30 text-gray-800 leading-snug"
                            placeholder="Escribe algo..."
                            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                        />

                        {/* Folded corner effect */}
                        <div
                            className="absolute bottom-0 right-0 w-4 h-4"
                            style={{
                                background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
                                borderTop: '1px solid rgba(0,0,0,0.1)',
                                borderLeft: '1px solid rgba(0,0,0,0.1)'
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {notes.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-50">
                    <span className="text-4xl mb-2">📝</span>
                    <p className="text-sm">No hay notas</p>
                </div>
            )}
        </div>
    );
};
