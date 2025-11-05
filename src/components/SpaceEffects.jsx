import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Meteor = ({ startPosition, direction, speed, size, trailLength }) => {
    const meteorRef = useRef();
    const trailRef = useRef();
    const trailOpacityRef = useRef(0);
    const initializedRef = useRef(false);

    const points = useMemo(() => {
        const trail = [];
        // Initialize all points at the starting position to avoid initial lines
        for (let i = 0; i < trailLength; i++) {
            trail.push(startPosition.clone());
        }
        return trail;
    }, [trailLength, startPosition]);

    const trailGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [points]);

    useFrame((state, delta) => {
        if (meteorRef.current) {
            if (!initializedRef.current) {
                // Set initial position without movement on first frame
                meteorRef.current.position.copy(startPosition);
                initializedRef.current = true;
                return;
            }

            // Move meteor
            meteorRef.current.position.x += direction.x * speed * delta;
            meteorRef.current.position.y += direction.y * speed * delta;
            meteorRef.current.position.z += direction.z * speed * delta;

            // Gradually fade in the trail
            if (trailOpacityRef.current < 0.5) {
                trailOpacityRef.current += delta * 0.5; // Fade in over 1 second
                if (trailRef.current?.material) {
                    trailRef.current.material.opacity = trailOpacityRef.current;
                }
            }

            // Update trail points
            points.unshift(meteorRef.current.position.clone());
            points.pop();
            trailGeometry.setFromPoints(points);

            // Reset position if meteor goes out of bounds
            const boundX = 200;
            const boundY = 200;
            if (Math.abs(meteorRef.current.position.x) > boundX ||
                Math.abs(meteorRef.current.position.y) > boundY) {
                // Reset to random position on the opposite side
                const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
                const newPosition = new THREE.Vector3();

                switch (side) {
                    case 0: // top
                        newPosition.set((Math.random() - 0.5) * boundX * 2, boundY, startPosition.z);
                        break;
                    case 1: // right
                        newPosition.set(boundX, (Math.random() - 0.5) * boundY * 2, startPosition.z);
                        break;
                    case 2: // bottom
                        newPosition.set((Math.random() - 0.5) * boundX * 2, -boundY, startPosition.z);
                        break;
                    case 3: // left
                        newPosition.set(-boundX, (Math.random() - 0.5) * boundY * 2, startPosition.z);
                        break;
                }

                meteorRef.current.position.copy(newPosition);
                points.fill(newPosition.clone());
            }
        }
    });

    return (
        <group>
            <mesh ref={meteorRef} position={startPosition}>
                <sphereGeometry args={[size, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <line ref={trailRef}>
                <bufferGeometry attach="geometry" {...trailGeometry} />
                <lineBasicMaterial
                    attach="material"
                    color="#ffffff"
                    transparent
                    opacity={0}
                    linewidth={1}
                />
            </line>
        </group>
    );
};

const SpaceEffects = () => {
    const meteors = useMemo(() => {
        const items = [];
        const count = 2 + Math.floor(Math.random() * 3); // 2 to 4 meteors

        for (let i = 0; i < count; i++) {
            // Random starting position in background space
            const radius = 150; // Increased radius to keep meteors further back
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            // Add a z-offset to ensure meteors stay in background
            const startPosition = new THREE.Vector3(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                -100 - Math.random() * 50 // Keep in background between -100 and -150
            );

            // Random direction for more varied paths
            const direction = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                0 // No movement in z-direction to stay in background
            ).normalize();

            items.push({
                key: i,
                startPosition: startPosition,
                direction: direction,
                speed: 2 + Math.random() * 3, // Much slower speed
                size: 0.2 + Math.random() * 0.3, // Slightly larger size for visibility
                trailLength: 30 + Math.floor(Math.random() * 20) // Longer trails
            });
        }

        return items;
    }, []);

    return (
        <group>
            {meteors.map((meteor) => (
                <Meteor key={meteor.key} {...meteor} />
            ))}
        </group>
    );
};

export default SpaceEffects;