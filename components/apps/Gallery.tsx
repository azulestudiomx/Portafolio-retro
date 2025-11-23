import React, { useRef, useState, useEffect } from 'react';

// Reusing "Gallery" component name to maintain App.tsx import compatibility,
// but functionality is now MacPaint.
export const Gallery: React.FC<{ onSetWallpaper?: (url: string) => void }> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tool, setTool] = useState<'pencil' | 'eraser' | 'line' | 'rect'>('pencil');
    const [isDrawing, setIsDrawing] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });
    const snapshot = useRef<ImageData | null>(null);

    // Init canvas white background
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (canvas && container) {
            // Set canvas size to match container
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = false;
            }
        }
    }, []);

    const getMousePos = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent) => {
        setIsDrawing(true);
        const { x, y } = getMousePos(e);
        startPos.current = { x, y };
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        // Save state for shapes
        snapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(x, y);
        if (tool === 'pencil' || tool === 'eraser') {
            ctx.lineTo(x, y); // Draw dot
            ctx.stroke();
        }
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const { x, y } = getMousePos(e);
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        ctx.lineWidth = tool === 'eraser' ? 10 : 2;
        ctx.lineCap = 'round'; // Retro macpaint was square usually but round feels better for web canvas
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : '#000000';

        if (tool === 'pencil' || tool === 'eraser') {
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (tool === 'line') {
            // Restore snapshot to clear previous frame of the line
            if (snapshot.current) ctx.putImageData(snapshot.current, 0, 0);
            ctx.beginPath();
            ctx.moveTo(startPos.current.x, startPos.current.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (tool === 'rect') {
            if (snapshot.current) ctx.putImageData(snapshot.current, 0, 0);
            const w = x - startPos.current.x;
            const h = y - startPos.current.y;
            ctx.strokeRect(startPos.current.x, startPos.current.y, w, h);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.closePath();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <div className="flex h-full bg-[#d4d4d4] font-chicago">
            {/* Toolbar */}
            <div className="w-12 flex flex-col items-center py-2 space-y-2 border-r border-gray-500 bg-[#e0e0e0]">
                <button 
                    onClick={() => setTool('pencil')}
                    className={`w-8 h-8 border-2 flex items-center justify-center ${tool === 'pencil' ? 'border-black bg-white pattern-check' : 'border-transparent hover:border-gray-500'}`}
                    title="Lápiz"
                >
                    ✏️
                </button>
                <button 
                    onClick={() => setTool('eraser')}
                    className={`w-8 h-8 border-2 flex items-center justify-center ${tool === 'eraser' ? 'border-black bg-white' : 'border-transparent hover:border-gray-500'}`}
                    title="Borrador"
                >
                    ⬜
                </button>
                <button 
                    onClick={() => setTool('line')}
                    className={`w-8 h-8 border-2 flex items-center justify-center ${tool === 'line' ? 'border-black bg-white' : 'border-transparent hover:border-gray-500'}`}
                    title="Línea"
                >
                    📏
                </button>
                <button 
                    onClick={() => setTool('rect')}
                    className={`w-8 h-8 border-2 flex items-center justify-center ${tool === 'rect' ? 'border-black bg-white' : 'border-transparent hover:border-gray-500'}`}
                    title="Rectángulo"
                >
                    🔲
                </button>
                
                <div className="h-4"></div>
                
                <button 
                    onClick={clearCanvas}
                    className="w-8 h-8 border-2 border-red-800 bg-red-100 flex items-center justify-center text-xs text-red-800 font-bold active:bg-red-300"
                    title="Borrar Todo"
                >
                    X
                </button>
                
                {/* Patterns area (Decoration) */}
                <div className="mt-auto w-full px-1">
                     <div className="w-full h-24 border border-black bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-50"></div>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 p-2 bg-[#808080] flex items-center justify-center overflow-hidden" ref={containerRef}>
                <div className="relative shadow-[4px_4px_0_rgba(0,0,0,0.5)] bg-white cursor-crosshair">
                     <canvas 
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="block touch-none"
                     />
                </div>
            </div>
        </div>
    );
};