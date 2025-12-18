import React, { useRef } from 'react';
import LaserFlow from '../bits/LaserFlow';

export const LaserDemo: React.FC = () => {
    const revealImgRef = useRef<HTMLImageElement>(null);

    return (
        <div
            className="w-full h-full relative overflow-hidden bg-[#060010]"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y + rect.height * 0.5}px`); // Adjusted for centering logic if needed, or stick to user's
                }
            }}
            onMouseLeave={() => {
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.0}
                color="#FF79C6"
            />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '86%',
                height: '60%',
                backgroundColor: 'rgba(6,0,16,0.8)', // Added transparency to see behind
                borderRadius: '20px',
                border: '2px solid #FF79C6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                zIndex: 6,
                textAlign: 'center'
            }}>
                <div className="font-chicago">
                    <p>Laser Reveal Demo</p>
                    <p className="text-sm mt-2 opacity-70">Mueve el mouse para revelar</p>
                </div>
            </div>

            <img
                ref={revealImgRef}
                src="https://res.cloudinary.com/dt96yonq2/image/upload/v1766086269/WALL_r5g4aj.jpg" // Using the wallpaper as the reveal image for now
                alt="Reveal effect"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%', // Ensure it covers
                    objectFit: 'cover',
                    top: '0',
                    left: '0',
                    zIndex: 5,
                    mixBlendMode: 'lighten',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    // @ts-ignore
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                }}
            />
        </div>
    );
};
