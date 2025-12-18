import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

const GridScanShader = {
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
    uniform vec3 linesColor;
    uniform vec3 scanColor;
    uniform float gridScale;
    uniform float sensitivity;
    uniform float scanOpacity;
    uniform float lineThickness;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Grid logic
      float gridX = step(1.0 - lineThickness * 0.01, fract(uv.x / gridScale));
      float gridY = step(1.0 - lineThickness * 0.01, fract(uv.y / gridScale));
      float grid = max(gridX, gridY);
      
      // Scan line logic
      float scanPos = fract(iTime * 0.2);
      float scan = smoothstep(0.4, 0.5, 1.0 - abs(uv.y - scanPos));
      
      // Combine
      vec3 finalColor = mix(vec3(0.0), linesColor, grid * sensitivity);
      finalColor += scanColor * scan * scanOpacity * grid; // light up grid on scan

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

interface GridScanProps {
    sensitivity?: number;
    lineThickness?: number;
    linesColor?: string;
    gridScale?: number;
    scanColor?: string;
    scanOpacity?: number;
    enablePost?: boolean;
    bloomIntensity?: number;
    chromaticAberration?: number;
    noiseIntensity?: number;
}

const GridMesh = ({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = "#392e4e",
    gridScale = 0.1,
    scanColor = "#FF9FFC",
    scanOpacity = 0.4
}: GridScanProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        iTime: { value: 0 },
        linesColor: { value: new THREE.Color(linesColor) },
        scanColor: { value: new THREE.Color(scanColor) },
        gridScale: { value: gridScale },
        sensitivity: { value: sensitivity },
        scanOpacity: { value: scanOpacity },
        lineThickness: { value: lineThickness }
    }), [linesColor, scanColor, gridScale, sensitivity, scanOpacity, lineThickness]);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.iTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                vertexShader={GridScanShader.vertexShader}
                fragmentShader={GridScanShader.fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const GridScan = ({
    enablePost = true,
    bloomIntensity = 0.6,
    chromaticAberration = 0.002,
    noiseIntensity = 0.01,
    ...props
}: GridScanProps) => {
    return (
        <Canvas camera={{ position: [0, 0, 1] }} style={{ background: '#000' }}>
            <GridMesh {...props} />
            {enablePost && (
                <EffectComposer>
                    <Bloom intensity={bloomIntensity} luminanceThreshold={0.5} />
                    <Noise opacity={noiseIntensity} />
                    <ChromaticAberration offset={new THREE.Vector2(chromaticAberration, chromaticAberration)} />
                </EffectComposer>
            )}
        </Canvas>
    );
};

export default GridScan;
