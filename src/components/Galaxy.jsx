import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';
import Planet from './Planet';
import SpaceEffects from './SpaceEffects';

const Galaxy = ({ data, position, onClick, isActive }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    useFrame((state, delta) => {
        if (groupRef.current && !clicked) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    const handleClick = (event) => {
        event.stopPropagation();
        setClicked(!clicked);

        // Fade out galaxy core and ring when clicked
        const coreOpacity = !clicked ? 0.8 : 0;
        const ringOpacity = !clicked ? 0.3 : 0;

        // Animate galaxy core
        if (groupRef.current.children[0]?.material) {
            gsap.to(groupRef.current.children[0].material, {
                opacity: coreOpacity,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }

        // Animate galaxy ring
        if (groupRef.current.children[1]?.material) {
            gsap.to(groupRef.current.children[1].material, {
                opacity: ringOpacity,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }

        // Call parent onClick to update activeGalaxy state
        onClick();
    };

    return (
        <>
            <group
                ref={groupRef}
                position={position}
                onClick={handleClick}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                }}
            >
                {/* Galaxy core */}
                <mesh>
                    <sphereGeometry args={[6, 32, 32]} />
                    <meshPhongMaterial
                        color={data.color}
                        opacity={0.8}
                        transparent
                        emissive={data.color}
                        emissiveIntensity={hovered ? 2 : 1}
                    />
                </mesh>

                {/* Galaxy ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[10, 1, 16, 100]} />
                    <meshPhongMaterial
                        color={data.color}
                        opacity={0.3}
                        transparent
                        emissive={data.color}
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Planets */}
                {isActive && data.planets.map((planet, index) => (
                    <Planet
                        key={planet.id}
                        data={planet}
                        index={index}
                        parentColor={data.color}
                    />
                ))}

                {/* Space Effects (Meteors/Comets) */}
                { <SpaceEffects />}
            </group>

            {/* Fixed Label */}
            <group position={position}>
                <Html position={[15, 0, 0]} center transform={false} occlude={false}>
                    <div
                        style={{
                            opacity: hovered || clicked ? 1 : 0.7,
                            background: 'rgba(0,0,0,0.9)',
                            padding: clicked ? '16px 20px' : '12px 16px',
                            borderRadius: '12px',
                            color: 'white',
                            width: clicked ? '400px' : '300px',
                            textAlign: 'left',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            transition: 'all 0.4s ease',
                            position: 'relative',
                            borderLeft: `4px solid ${data.color}`,
                            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: '-24px',
                            top: '50%',
                            width: '20px',
                            height: '2px',
                            background: data.color,
                            transform: 'translateY(-50%)'
                        }} />
                        <h3 style={{
                            margin: '0 0 8px 0',
                            fontSize: clicked ? '24px' : '18px',
                            transition: 'all 0.3s ease',
                            color: data.color
                        }}>{data.name}</h3>
                        <p style={{
                            margin: 0,
                            fontSize: clicked ? '16px' : '14px',
                            transition: 'all 0.3s ease',
                            opacity: 0.9,
                            lineHeight: '1.4'
                        }}>{data.description}</p>
                    </div>
                </Html>
            </group>
        </>
    );
};

export default Galaxy;