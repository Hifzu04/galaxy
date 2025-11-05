import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { galaxiesData } from './data/galaxiesData'
import Galaxy from './components/Galaxy'
import './App.css'

function App() {
  const [activeGalaxy, setActiveGalaxy] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 40, 100]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={30}
          maxDistance={150}
          maxPolarAngle={Math.PI / 2}
        />

        <Stars
          radius={150}
          depth={60}
          count={7000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {galaxiesData.map((galaxy, index) => {
          const angle = (index * 2 * Math.PI) / galaxiesData.length;
          const radius = 40;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <Galaxy
              key={galaxy.id}
              data={galaxy}
              position={[x, 0, z]}
              onClick={() => setActiveGalaxy(activeGalaxy === galaxy.id ? null : galaxy.id)}
              isActive={activeGalaxy === galaxy.id}
            />
          );
        })}
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Navigation Guide</h3>
        <p style={{ margin: '0', fontSize: '14px' }}>
          • Click and drag to rotate the view<br />
          • Scroll to zoom in/out<br />
          • Click on a galaxy to reveal its planets<br />
          • Hover over elements to see details
        </p>
      </div>
    </div>
  )
}

export default App
