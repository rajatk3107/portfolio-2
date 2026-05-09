'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, Sparkles, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─── Types ───────────────────────────────────────────────────

type MouseRef = React.MutableRefObject<{ x: number; y: number }>

// ─── Central Morphing Orb ─────────────────────────────────────

function CentralOrb() {
  const meshRef  = useRef<THREE.Mesh>(null)
  const wireRef  = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.28) * 0.15
      meshRef.current.rotation.y = t * 0.09
      meshRef.current.rotation.z = Math.cos(t * 0.18) * 0.08
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -Math.sin(t * 0.2) * 0.1
      wireRef.current.rotation.y = t * 0.06
    }
  })

  return (
    <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        {/* Core distorted sphere */}
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[2.0, 8]} />
          <MeshDistortMaterial
            color="#8a6e38"
            metalness={0.95}
            roughness={0.08}
            distort={0.22}
            speed={1.4}
            envMapIntensity={3}
          />
        </mesh>

        {/* Low-poly wireframe halo — offset slightly larger */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[2.06, 1]} />
          <meshBasicMaterial
            color="#c4a25a"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Equatorial ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.9, 0.018, 8, 128]} />
          <meshBasicMaterial color="#c4a25a" transparent opacity={0.18} />
        </mesh>

        {/* Tilted secondary ring */}
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[3.2, 0.01, 8, 128]} />
          <meshBasicMaterial color="#c4a25a" transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  )
}

// ─── Small Floating Fragments ─────────────────────────────────

function Fragments() {
  const data = useMemo(() => [
    { pos: [3.8,  1.6, -0.5] as [number,number,number], size: 0.22, speed: 1.1, rot: 2.5 },
    { pos: [-3.5, 2.0,  1.0] as [number,number,number], size: 0.18, speed: 0.7, rot: 1.8 },
    { pos: [2.5, -2.4,  0.8] as [number,number,number], size: 0.28, speed: 1.4, rot: 3.0 },
    { pos: [-2.8,-1.8, -0.8] as [number,number,number], size: 0.16, speed: 0.9, rot: 2.0 },
    { pos: [0.4,  3.2, -1.2] as [number,number,number], size: 0.20, speed: 1.3, rot: 2.2 },
    { pos: [-1.0,-3.0,  0.6] as [number,number,number], size: 0.14, speed: 0.6, rot: 1.5 },
  ], [])

  return (
    <>
      {data.map((d, i) => (
        <Float key={i} speed={d.speed} rotationIntensity={d.rot} floatIntensity={0.8}>
          <mesh position={d.pos}>
            <octahedronGeometry args={[d.size]} />
            <meshStandardMaterial
              color="#c4a25a"
              metalness={0.9}
              roughness={0.12}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// ─── Cursor-Reactive Point Light ──────────────────────────────

function CursorLight({ mouse }: { mouse: MouseRef }) {
  const ref = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.x += (mouse.current.x * 7 - ref.current.position.x) * 0.07
    ref.current.position.y += (mouse.current.y * 4 - ref.current.position.y) * 0.07
  })

  return (
    <pointLight
      ref={ref}
      color="#dfc07a"
      intensity={6}
      distance={14}
      decay={2}
    />
  )
}

// ─── Second Ambient Light (counter-movement) ──────────────────

function AmbientCursorLight({ mouse }: { mouse: MouseRef }) {
  const ref = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!ref.current) return
    // Moves opposite to cursor for depth
    ref.current.position.x += (-mouse.current.x * 4 - ref.current.position.x) * 0.04
    ref.current.position.y += (-mouse.current.y * 3 - ref.current.position.y) * 0.04
    ref.current.position.z = -3
  })

  return (
    <pointLight
      ref={ref}
      color="#4a3800"
      intensity={3}
      distance={12}
      decay={2}
    />
  )
}

// ─── Scene Root ───────────────────────────────────────────────

function SceneContent({ mouse }: { mouse: MouseRef }) {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[-5, 5, 5]} color="#fff8f0" intensity={0.8} />
      <CursorLight       mouse={mouse} />
      <AmbientCursorLight mouse={mouse} />

      <Environment preset="city" />

      <CentralOrb />
      <Fragments />

      <Sparkles
        count={100}
        scale={12}
        size={0.8}
        speed={0.2}
        opacity={0.15}
        color="#c4a25a"
        noise={0.2}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          intensity={1.8}
          radius={0.7}
        />
        <Vignette offset={0.35} darkness={0.7} />
      </EffectComposer>
    </>
  )
}

// ─── Exported Canvas ──────────────────────────────────────────

export default function Scene3D({ mouse }: { mouse: MouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <SceneContent mouse={mouse} />
    </Canvas>
  )
}
