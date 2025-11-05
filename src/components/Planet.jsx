import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';

const Planet = ({ data, index, parentColor }) => {
    const orbitRef = useRef();
    const planetRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
  ///  const [visible, setVisible] = useState(true);

    // Initial orbit position
    const initialAngle = (index * (2 * Math.PI)) / 6;
    const [orbitAngle, setOrbitAngle] = useState(initialAngle);

    // Handle planet rotation and orbit
    useFrame((state, delta) => {
        const newAngle = orbitAngle + (delta * data.rotationSpeed);
        setOrbitAngle(newAngle);

        if (planetRef.current) {
            planetRef.current.rotation.y += delta * 0.5;
        }
    });

    const handleClick = (event) => {
        event.stopPropagation();
        setClicked(!clicked);

        if (planetRef.current && planetRef.current.material) {
            gsap.to(planetRef.current.material, {
                emissiveIntensity: clicked ? 0.8 : 1.5,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <>
            {/* Orbit circle */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[data.orbitRadius, 0.4, 16, 50]} />
                <meshBasicMaterial
                    color={parentColor}
                    opacity={.1}
                    transparent={true}
                    visible={true}
                />
            </mesh>

            {/* Planet and Label group */}
            <group ref={orbitRef} rotation={[0, orbitAngle, 0]}>
                {/* Planet sphere */}
                <mesh
                    ref={planetRef}
                    position={[data.orbitRadius, 0, 0]}
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
                    <sphereGeometry args={[data.size * 2, 32, 32]} />
                    <meshPhongMaterial
                        color={parentColor}
                        opacity={1}
                        transparent={false}
                        emissive={parentColor}
                        emissiveIntensity={hovered ? 3 : 1.2}
                        visible={true}
                        depthTest={false}
                    />
                </mesh>

                {/* Planet Label */}
                <Html
                    position={[data.orbitRadius + 3, 2, 0]}
                    center
                    distanceFactor={1}
                    style={{
                        display: 'block',
                        width: 'auto',
                        height: 'auto',
                        opacity: .8,
                        transform: 'scale(40)',
                        pointerEvents: 'none'
                    }}
                >
                    <div
                        style={{
                            opacity: 1,
                            background: 'rgba(0,0,0,0.95)',
                            padding: '25px 30px',
                            borderRadius: '20px',
                            color: 'white',
                            width: '400px',
                            textAlign: 'left',
                            transform: 'translate(0, -50%)',
                            pointerEvents: 'none',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            borderLeft: `10px solid ${parentColor}`,
                            boxShadow: '0 4px 30px rgba(0,0,0,0.8)',
                            whiteSpace: 'normal',
                            lineHeight: '1.3',
                            zIndex: 1000
                        }}>
                        {/* Arrow connecting to planet */}
                      
                        <div style={{
                            fontSize: '32px',
                            fontWeight: '600',
                            color: parentColor,
                            marginBottom: '8px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s ease'
                        }}>
                            {data.name}
                        </div>
                        <div style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: '400'
                        }}>
                            Explore this aspect of your spiritual journey
                        </div>
                    </div>
                </Html>
            </group>
        </>
    );
};

export default Planet;