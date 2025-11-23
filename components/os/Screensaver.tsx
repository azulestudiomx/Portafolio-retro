
import React, { useEffect, useRef } from 'react';
import { IconAzulLogo } from '../icons/OsIcons';

interface ScreensaverProps {
    onExit: () => void;
}

export const Screensaver: React.FC<ScreensaverProps> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Star properties
        const stars: { x: number; y: number; z: number }[] = [];
        const numStars = 400;
        const speed = 4; // Warp speed

        // Init stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width
            });
        }

        let animationId: number;

        const render = () => {
            // Fill background with slight opacity for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';

            stars.forEach(star => {
                // Move star towards viewer
                star.z -= speed;

                // Reset star if it passes the screen
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }

                // 3D Projection
                const k = 128.0 / star.z;
                const px = star.x * k + canvas.width / 2;
                const py = star.y * k + canvas.height / 2;
                
                // Size grows as it gets closer
                const size = (1 - star.z / canvas.width) * 3;

                // Draw star if within bounds
                if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                    ctx.beginPath();
                    ctx.arc(px, py, Math.max(0.1, size), 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(render);
        };
        
        render();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div 
            className="fixed inset-0 z-[9999] bg-black cursor-none overflow-hidden select-none"
            onClick={onExit}
            onMouseMove={onExit}
            onKeyDown={onExit}
            onTouchStart={onExit}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
            
            {/* Floating Brand Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
                    <div className="w-32 h-32 mb-6 bg-white p-3 rounded-2xl shadow-[0_0_40px_rgba(59,89,152,0.8)] border-4 border-black">
                         <IconAzulLogo className="w-full h-full" />
                    </div>
                    <h1 className="text-white font-chicago text-3xl tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                        Azul Estudio
                    </h1>
                </div>
            </div>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
                    50% { transform: translateY(-20px) scale(1.05) rotate(2deg); }
                }
            `}</style>
        </div>
    );
};
