
// Synthesized Retro Sounds using Web Audio API
// No external assets needed!

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Mechanical click sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio errors (browsers blocking autoplay etc)
  }
};

export const playStartupSound = () => {
  try {
    const ctx = getAudioContext();
    // Attempt to resume (might fail without user gesture interaction, but necessary to try)
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});

    const t = ctx.currentTime;
    const duration = 4.5;

    // The Classic Mac Startup Chime Design:
    // A rich C Major chord with added harmonics.
    // Texture: Mixture of Sawtooth (bright, metallic) and Triangle (hollow, warm).
    // Filter: Lowpass filter sweeping down to simulate the "decay" of brightness.
    
    const masterGain = ctx.createGain();
    
    // Create a Low Pass Filter for that "analog synth" sweeping sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(5000, t); // Start bright
    filter.frequency.exponentialRampToValueAtTime(500, t + 2.5); // Sweep down
    
    masterGain.connect(filter);
    filter.connect(ctx.destination);
    
    // Master ADSR Envelope
    masterGain.gain.setValueAtTime(0, t);
    masterGain.gain.linearRampToValueAtTime(0.5, t + 0.1); // Attack
    masterGain.gain.exponentialRampToValueAtTime(0.001, t + duration); // Long Decay

    // Chord Frequencies (C Major / C Add9 ish)
    const chord = [
        { f: 130.81, type: 'sawtooth' as OscillatorType, vol: 0.6 }, // C3 (Base)
        { f: 196.00, type: 'sawtooth' as OscillatorType, vol: 0.5 }, // G3
        { f: 261.63, type: 'sawtooth' as OscillatorType, vol: 0.5 }, // C4
        { f: 329.63, type: 'triangle' as OscillatorType, vol: 0.4 }, // E4 (Major 3rd)
        { f: 392.00, type: 'triangle' as OscillatorType, vol: 0.4 }, // G4
        { f: 523.25, type: 'sine' as OscillatorType,     vol: 0.5 }, // C5 (Top)
        { f: 1046.50, type: 'sine' as OscillatorType,    vol: 0.1 }, // C6 (Air/Shimmer)
    ];

    chord.forEach(({ f, type, vol }) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = f;
        
        // Subtle detune for analog warmth/chorus effect
        const detune = (Math.random() - 0.5) * 15;
        osc.detune.value = detune;

        const oscGain = ctx.createGain();
        oscGain.gain.value = vol;

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(t);
        osc.stop(t + duration);
    });

  } catch (e) {
    console.error("Startup sound failed", e);
  }
};

export const playWindowDragSound = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
    
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
    
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
    
        // Low frequency thud
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(80, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.08);
    
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.08);
      } catch (e) {
        // Ignore
      }
}
