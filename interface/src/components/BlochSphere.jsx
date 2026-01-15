import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Componente que desenha a esfera e a seta do Qubit
function BlochSphereContent({ alpha, beta }) {
    // Converter amplitudes complexas para coordenadas esféricas (Bloch Vector)
    // Estado: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
    // Alpha é real (pela normalização global), Beta tem fase.
    // Mas Alpha pode ser complexo. Precisamos remover fase global.
    // Vamos assumir Alpha real positivo para simplificar a visualização padrão,
    // ou calcular Theta/Phi genéricos.

    // Magnitude de |1⟩ = sin(θ/2) = beta.magnitude
    // Magnitude de |0⟩ = cos(θ/2) = alpha.magnitude
    // Theta = 2 * acos(|alpha|)
    const theta = 2 * Math.acos(alpha.magnitude());

    // Phi é a fase relativa entre beta e alpha.
    // Phase(beta) - Phase(alpha)
    const phi = Math.atan2(beta.imag, beta.real) - Math.atan2(alpha.imag, alpha.real);

    // Converter (r=1, theta, phi) para Cartesiano (x, y, z)
    // Z é o eixo |0⟩ / |1⟩
    // X e Y são as fases
    // Convenção física:
    // z = cos(theta)
    // x = sin(theta) * cos(phi)
    // y = sin(theta) * sin(phi)

    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);

    const arrowRef = useRef();

    return (
        <group>
            {/* Esfera Transparente */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#e0e0e0"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.1}
                    wireframe
                />
            </mesh>

            {/* Eixos */}
            <line>
                <bufferGeometry>
                    <float32BufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array([0, -1.2, 0, 0, 1.2, 0]), 3]}
                        count={2}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="gray" opacity={0.5} />
            </line>
            <Text position={[0, 1.3, 0]} fontSize={0.1} color="black">|0⟩</Text>
            <Text position={[0, -1.3, 0]} fontSize={0.1} color="black">|1⟩</Text>

            {/* Vetor do Estado (Seta) */}
            <arrowHelper args={[new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), 1, 0xff0000]} />

            {/* Marcador na ponta */}
            <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    );
}

export default function BlochSphere({ qubit }) {
    // Se não houver qubit, assume |0⟩
    const alpha = qubit ? qubit.alpha : { magnitude: () => 1, real: 1, imag: 0 };
    const beta = qubit ? qubit.beta : { magnitude: () => 0, real: 0, imag: 0 };

    return (
        <div style={{ width: '300px', height: '300px', background: '#f5f5f5', borderRadius: '8px' }}>
            <Canvas camera={{ position: [2, 1, 2], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <BlochSphereContent alpha={alpha} beta={beta} />
                <OrbitControls enableZoom={false} />
            </Canvas>
            <div style={{ textAlign: 'center', padding: '5px', fontSize: '12px', color: '#333' }}>
                Visualização de Bloch
            </div>
        </div>
    );
}
