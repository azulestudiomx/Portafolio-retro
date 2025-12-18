import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LaserFlowShader = {
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
    uniform float horizontalOffset;
    uniform float verticalOffset;
    varying vec2 vUv;

    // Noise function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create moving beams
      float beamH = 0.0;
      float beamV = 0.0;
      
      // Horizontal beams
      float hSpeed = 0.5;
      float hPos = fract(uv.y + iTime * hSpeed + horizontalOffset);
      beamH = 1.0 / (abs(uv.y - hPos) * 50.0 + 0.1); // Glow calculation
      if (abs(uv.y - hPos) > 0.1) beamH = 0.0; // Cutoff
      
      // Multiple lines
      for(float i=0.0; i<5.0; i++) {
        float pos = fract(uv.y + iTime * (0.2 + i * 0.1) + verticalOffset * i);
        float glow = 0.005 / abs(uv.y - pos);
        beamH += glow * (0.5 + 0.5 * sin(iTime + i));
      }

      vec3 finalColor = iColor * beamH;
      
      // Add subtle fog/background
      finalColor += iColor * 0.1 * (uv.y);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

interface LaserFlowProps {
    horizontalBeamOffset?: number;
    verticalBeamOffset?: number;
    color?: string;
}

const LaserMesh = ({ horizontalBeamOffset = 0, verticalBeamOffset = 0, color = "#FF79C6" }: LaserFlowProps) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
        iColor: { value: new THREE.Color(color) },
        horizontalOffset: { value: horizontalBeamOffset },
        verticalOffset: { value: verticalBeamOffset }
    }), [color, horizontalBeamOffset, verticalBeamOffset]);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.iTime.value = state.clock.getElapsedTime();
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.iColor.value.set(color);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                vertexShader={LaserFlowShader.vertexShader}
                fragmentShader={LaserFlowShader.fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const LaserFlow = (props: LaserFlowProps) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <LaserMesh {...props} />
            </Canvas>
        </div>
    );
};

export default LaserFlow;
