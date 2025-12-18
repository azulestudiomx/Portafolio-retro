import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PixelBlastShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec3 iColor;
    uniform float pixelSize;
    uniform float patternScale;
    uniform float edgeFade;
    uniform float speed;
    
    // Liquid/Ripple uniforms
    uniform float liquidStrength;
    uniform float liquidRadius;
    uniform float liquidWobbleSpeed;
    
    varying vec2 vUv;

    // Bayer Matrix 4x4
    const mat4 bayer4 = mat4(
        0.0, 12.0, 3.0, 15.0,
        8.0, 4.0, 11.0, 7.0,
        2.0, 14.0, 1.0, 13.0,
        10.0, 6.0, 9.0, 5.0
    );

    float getBayer(vec2 pos) {
        int x = int(mod(pos.x, 4.0));
        int y = int(mod(pos.y, 4.0));
        
        // Manual matrix access since indexing with variables can be tricky in some GLSL versions
        // Flattened access logic
        if (x == 0) {
            if (y == 0) return 0.0; if (y == 1) return 8.0; if (y == 2) return 2.0; return 10.0;
        } else if (x == 1) {
            if (y == 0) return 12.0; if (y == 1) return 4.0; if (y == 2) return 14.0; return 6.0;
        } else if (x == 2) {
            if (y == 0) return 3.0; if (y == 1) return 11.0; if (y == 2) return 1.0; return 9.0;
        } else {
            if (y == 0) return 15.0; if (y == 1) return 7.0; if (y == 2) return 13.0; return 5.0;
        }
    }

    void main() {
      // Pixelate UVs
      vec2 p = vUv;
      
      // Liquid distortion
      float dist = distance(p, vec2(0.5));
      float angle = atan(p.y - 0.5, p.x - 0.5);
      float wobble = sin(angle * 5.0 + iTime * liquidWobbleSpeed) * liquidStrength * smoothstep(liquidRadius, 0.0, dist);
      p += vec2(cos(angle), sin(angle)) * wobble;

      // Pixelation
      vec2 grid = vec2(pixelSize * 100.0); // scale up
      vec2 pixelUV = floor(p * grid) / grid;
      
      // Dithering pattern
      vec2 screenPos = gl_FragCoord.xy;
      float dither = getBayer(screenPos / patternScale) / 16.0;
      
      // Dynamic color pattern
      float pattern = sin(pixelUV.x * 10.0 + iTime * speed) * cos(pixelUV.y * 10.0 + iTime * speed);
      pattern += sin(length(pixelUV - 0.5) * 20.0 - iTime * speed);
      
      // Threshold with dither
      float val = step(dither, pattern * 0.5 + 0.5);
      
      // Fade edges
      float fade = smoothstep(0.5, 0.5 - edgeFade, distance(vUv, vec2(0.5)));
      
      vec3 finalColor = iColor * val * fade;
      
      gl_FragColor = vec4(finalColor, val * fade); // Use alpha for transparency
    }
  `
};

interface PixelBlastProps {
    variant?: 'circle' | 'square';
    pixelSize?: number;
    color?: string;
    patternScale?: number;
    patternDensity?: number;
    pixelSizeJitter?: number;
    enableRipples?: boolean;
    rippleSpeed?: number;
    rippleThickness?: number;
    rippleIntensityScale?: number;
    liquid?: boolean;
    liquidStrength?: number;
    liquidRadius?: number;
    liquidWobbleSpeed?: number;
    speed?: number;
    edgeFade?: number;
    transparent?: boolean;
}

const PixelMesh = ({
    pixelSize = 6,
    color = "#B19EEF",
    patternScale = 3,
    speed = 0.6,
    edgeFade = 0.25,
    liquid = false,
    liquidStrength = 0.12,
    liquidRadius = 1.2,
    liquidWobbleSpeed = 5
}: PixelBlastProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
        iColor: { value: new THREE.Color(color) },
        pixelSize: { value: pixelSize },
        patternScale: { value: patternScale },
        edgeFade: { value: edgeFade },
        speed: { value: speed },
        liquidStrength: { value: liquid ? liquidStrength : 0 },
        liquidRadius: { value: liquidRadius },
        liquidWobbleSpeed: { value: liquidWobbleSpeed }
    }), [color, pixelSize, patternScale, edgeFade, speed, liquid, liquidStrength, liquidRadius, liquidWobbleSpeed]);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.iTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                vertexShader={PixelBlastShader.vertexShader}
                fragmentShader={PixelBlastShader.fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const PixelBlast = (props: PixelBlastProps) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 1] }} style={{ background: props.transparent ? 'transparent' : '#000' }}>
                <PixelMesh {...props} />
            </Canvas>
        </div>
    );
};

export default PixelBlast;
