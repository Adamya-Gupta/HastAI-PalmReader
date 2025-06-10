"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import * as THREE from "three";

function HandModelComponent(): React.JSX.Element {
  const meshRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, "/models/hand.obj");

  // Auto-rotate the hand on Y-axis
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    const skinColor = new THREE.Color(0xffb6a3);
    const palmColor = new THREE.Color(0xf5a992);
    const nailColor = new THREE.Color(0xffddd6);
    const fingertipColor = new THREE.Color(0xff9999);

    obj.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name?.toLowerCase() || "";

        let materialColor = skinColor;
        let roughness = 0.7;
        let metalness = 0.05;

        if (meshName.includes("nail") || meshName.includes("fingernail")) {
          materialColor = nailColor;
          roughness = 0.3;
          metalness = 0.1;
        } else if (meshName.includes("palm") || meshName.includes("thumb")) {
          materialColor = palmColor;
        } else if (meshName.includes("finger") || meshName.includes("tip")) {
          materialColor = fingertipColor;
        }

        // Dispose of old material if it exists
        if (mesh.material && (mesh.material as THREE.Material).dispose) {
          (mesh.material as THREE.Material).dispose();
        }

        mesh.material = new THREE.MeshStandardMaterial({
          color: materialColor,
          roughness: roughness,
          metalness: metalness,
        });

        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    // Cleanup function to dispose of materials when component unmounts
    return () => {
      obj.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => material.dispose());
            } else {
              mesh.material.dispose();
            }
          }
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
        }
      });
    };
  }, [obj]);

  return <primitive ref={meshRef} object={obj} scale={0.16} position={[0, -0.8, 0]} />;
}

function Lighting(): React.JSX.Element {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 2, 5]} intensity={1.2} castShadow={false} />
    </>
  );
}

export default function HandModel(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasProps = {
    ref: canvasRef,
    camera: { position: [0, 0, 2.5] as [number, number, number], fov: 40 },
    shadows: false,
    gl: {
      antialias: true,
      alpha: true,
      powerPreference: "high-performance" as const,
      preserveDrawingBuffer: false, // Important for memory management
    },
    onCreated: ({ gl }: { gl: THREE.WebGLRenderer }) => {
      // Set up proper disposal
      gl.debug.checkShaderErrors = false; // Disable in production
    },
  };

  const orbitControlsProps = {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 1,
    maxDistance: 10,
    enablePan: false,
    enableZoom: false,
    enableRotate: true,
    autoRotate: false,
  };

  // Cleanup effect to handle WebGL context disposal
  useEffect(() => {
    return () => {
      // Force cleanup of WebGL context when component unmounts
      if (canvasRef.current) {
        const gl = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('webgl2');
        if (gl && gl.getExtension('WEBGL_lose_context')) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        position: "relative",
      }}
    >
      <Canvas {...canvasProps}>
        <Lighting />
        <Suspense fallback={null}>
          <HandModelComponent />
        </Suspense>
        <OrbitControls {...orbitControlsProps} />
      </Canvas>
    </div>
  );
}