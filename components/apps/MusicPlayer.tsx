
import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
    { title: "Synthwave Demo 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "06:12" },
    { title: "Lofi Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: "08:14" },
    { title: "Retro Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: "05:25" }
];

export const MusicPlayer: React.FC = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio(TRACKS[currentTrackIndex].url);
        audioRef.current.volume = 0.5;

        const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
        const handleEnded = () => nextTrack();

        audioRef.current.addEventListener('timeupdate', updateTime);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, []); // Run once on mount to setup, but we handle track changes separately

    // Handle Track Change
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = TRACKS[currentTrackIndex].url;
            setCurrentTime(0);
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    // Format time MM:SS
    const formatTime = (time: number) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full flex flex-col bg-[#333] border-4 border-[#666] shadow-inner p-4 select-none relative overflow-hidden">
             {/* Brushed Metal Texture overlay */}
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>

             {/* LCD Display */}
             <div className="bg-[#222] border-4 border-[#111] rounded p-3 mb-4 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] relative">
                 <div className="flex justify-between items-end font-mono">
                     <div className="flex flex-col">
                        <span className="text-[#00ff00] text-xs opacity-70 mb-1">TRACK</span>
                        <span className="text-[#00ff00] text-4xl leading-none font-bold" style={{ textShadow: '0 0 5px #00ff00' }}>
                            {(currentTrackIndex + 1).toString().padStart(2, '0')}
                        </span>
                     </div>
                     
                     <div className="flex flex-col items-end">
                        <span className="text-[#00ff00] text-xs opacity-70 mb-1">TIME</span>
                        <span className="text-[#00ff00] text-4xl leading-none font-bold" style={{ textShadow: '0 0 5px #00ff00' }}>
                            {formatTime(currentTime)}
                        </span>
                     </div>
                 </div>

                 {/* Simulated Spectrum Analyzer */}
                 <div className="mt-2 h-8 flex items-end justify-between px-1 gap-1 opacity-60">
                     {[...Array(12)].map((_, i) => (
                         <div 
                            key={i} 
                            className="bg-[#00ff00] w-full transition-all duration-75"
                            style={{ 
                                height: isPlaying ? `${Math.random() * 100}%` : '5%',
                                boxShadow: '0 0 2px #00ff00' 
                            }}
                         ></div>
                     ))}
                 </div>
             </div>

             {/* Track Info */}
             <div className="bg-[#1a1a1a] p-1 mb-4 text-center border border-[#444]">
                 <p className="text-[#00cc00] font-mono text-sm truncate animate-pulse">
                     {TRACKS[currentTrackIndex].title}
                 </p>
             </div>

             {/* Controls */}
             <div className="flex justify-between items-center mt-auto">
                 {/* Main Buttons */}
                 <div className="flex space-x-2">
                     <button 
                        onClick={prevTrack}
                        className="w-10 h-8 bg-gradient-to-b from-[#888] to-[#555] border border-black rounded active:brightness-75 flex items-center justify-center shadow-lg text-white font-bold text-xs"
                     >
                        |&lt;&lt;
                     </button>
                     <button 
                        onClick={stop}
                        className="w-10 h-8 bg-gradient-to-b from-[#888] to-[#555] border border-black rounded active:brightness-75 flex items-center justify-center shadow-lg text-white font-bold text-xs"
                     >
                        ■
                     </button>
                     <button 
                        onClick={togglePlay}
                        className="w-14 h-8 bg-gradient-to-b from-[#888] to-[#555] border border-black rounded active:brightness-75 flex items-center justify-center shadow-lg text-white font-bold"
                     >
                        {isPlaying ? '||' : '▶'}
                     </button>
                     <button 
                        onClick={nextTrack}
                        className="w-10 h-8 bg-gradient-to-b from-[#888] to-[#555] border border-black rounded active:brightness-75 flex items-center justify-center shadow-lg text-white font-bold text-xs"
                     >
                        &gt;&gt;|
                     </button>
                 </div>

                 {/* Volume (Visual) */}
                 <div className="flex items-center">
                     <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[15px] border-r-gray-400 border-b-[15px] border-b-transparent"></div>
                 </div>
             </div>

             {/* Branding */}
             <div className="absolute top-1 right-2 pointer-events-none">
                 <span className="text-[8px] font-bold text-gray-500 italic">AppleCD Audio Player</span>
             </div>
        </div>
    );
};
