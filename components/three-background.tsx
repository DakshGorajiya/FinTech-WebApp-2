"use client"

import { useRef, useEffect, useMemo } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Sphere } from "@react-three/drei"

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  // Pre-compute random values to avoid recreating them on each render
  const sphereData = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10],
      size: 0.2 + Math.random() * 0.8,
      speed: 1 + Math.random() * 2,
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {sphereData.map((data, i) => (
        <Float
          key={i}
          speed={data.speed}
          rotationIntensity={0.2}
          floatIntensity={0.5}
          position={data.position as [number, number, number]}
        >
          <Sphere args={[data.size, 16, 16]}>
            <meshStandardMaterial
              color={data.color}
              roughness={0.1}
              metalness={0.8}
              envMapIntensity={1}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function GridLines() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  // Pre-compute grid lines data
  const horizontalLines = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const y = (i - 10) * 1.5
      return { key: `horizontal-${i}`, y }
    })
  }, [])

  const verticalLines = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const x = (i - 10) * 1.5
      return { key: `vertical-${i}`, x }
    })
  }, [])

  return (
    <group ref={gridRef}>
      {horizontalLines.map(({ key, y }) => (
        <line key={key}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([-15, y, 0, 15, y, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a365d" transparent opacity={0.2} />
        </line>
      ))}

      {verticalLines.map(({ key, x }) => (
        <line key={key}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([x, -15, 0, x, 15, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a365d" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  )
}

function MovingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500

  // Create a ref to store velocities to avoid recreating them on each frame
  const velocitiesRef = useRef<Float32Array | null>(null)

  useEffect(() => {
    if (!particlesRef.current) return

    // Initialize positions
    const positions = new Float32Array(particleCount * 3)

    // Initialize velocities if not already done
    if (!velocitiesRef.current) {
      velocitiesRef.current = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Set initial positions
        positions[i3] = (Math.random() - 0.5) * 30
        positions[i3 + 1] = (Math.random() - 0.5) * 30
        positions[i3 + 2] = (Math.random() - 0.5) * 30

        // Set velocities
        velocitiesRef.current[i3] = (Math.random() - 0.5) * 0.02
        velocitiesRef.current[i3 + 1] = (Math.random() - 0.5) * 0.02
        velocitiesRef.current[i3 + 2] = (Math.random() - 0.5) * 0.02
      }
    }

    // Set the positions attribute
    particlesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  }, [particleCount])

  useFrame(() => {
    if (!particlesRef.current || !velocitiesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Update positions based on velocities
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Boundary check and bounce
      if (Math.abs(positions[i3]) > 15) velocities[i3] *= -1
      if (Math.abs(positions[i3 + 1]) > 15) velocities[i3 + 1] *= -1
      if (Math.abs(positions[i3 + 2]) > 15) velocities[i3 + 2] *= -1
    }

    // Mark the positions attribute as needing an update
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="#4299e1" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas className="h-full w-full">
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 5, 30]} />
      <ambientLight intensity={0.5} />
      <FloatingSpheres />
      <GridLines />
      <MovingParticles />
      <Environment preset="city" />
    </Canvas>
  )
}

