// "use client";

// import React, { Suspense, useEffect, useRef } from "react";
// import { Canvas, useLoader, useFrame, ThreeElements } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// import * as THREE from "three";

// interface HandModelComponentProps {}

// function HandModelComponent(): React.JSX.Element {
//   const meshRef = useRef<THREE.Group>(null);
//   const obj = useLoader(OBJLoader, "/models/hand.obj");

//   // Auto-rotate the hand on Y-axis
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.005; // Slow rotation
//     }
//   });

//   useEffect(() => {
//     // Define skin colors for different parts
//     const skinColor = new THREE.Color(0xFFB6A3); // Pinkish skin tone
//     const palmColor = new THREE.Color(0xF5A992); // Slightly darker for palm
//     const nailColor = new THREE.Color(0xFFDDD6); // Light pink for nails
//     const fingertipColor = new THREE.Color(0xFF9999); // Slightly more pink for fingertips

//     // Apply materials to different parts of the hand
//     obj.traverse((child: THREE.Object3D) => {
//       if ((child as THREE.Mesh).isMesh) {
//         const mesh = child as THREE.Mesh;
//         const meshName = mesh.name?.toLowerCase() || '';
       
//         let materialColor = skinColor;
//         let roughness = 0.7;
//         let metalness = 0.05;

//         // Check different parts of the hand and assign colors
//         if (meshName.includes('nail') || meshName.includes('fingernail')) {
//           materialColor = nailColor;
//           roughness = 0.3;
//           metalness = 0.1;
//         } else if (meshName.includes('palm') || meshName.includes('thumb')) {
//           materialColor = palmColor;
//         } else if (meshName.includes('finger') || meshName.includes('tip')) {
//           materialColor = fingertipColor;
//         }

//         // Create material with color variations
//         mesh.material = new THREE.MeshStandardMaterial({
//           color: materialColor,
//           roughness: roughness,
//           metalness: metalness,
//           transparent: false,
//         });

//         // Disable shadows for the hand model
//         mesh.castShadow = false;
//         mesh.receiveShadow = false;
//       }
//     });
//   }, [obj]);

//   return <primitive ref={meshRef} object={obj} scale={0.1} />;
// }

// function Lighting(): React.JSX.Element {
//   return (
//     <>
//       {/* Ambient light for overall illumination */}
//       <ambientLight intensity={0.4} />
     
//       {/* Main directional light from front - no shadows */}
//       <directionalLight
//         position={[0, 2, 5]}
//         intensity={1.2}
//         castShadow={false}
//       />
//     </>
//   );
// }

// interface GroundPlaneProps {
//   position?: [number, number, number];
//   size?: [number, number];
//   opacity?: number;
// }

// function GroundPlane({
//   position = [0, -2, 0],
//   size = [20, 20],
//   opacity = 0.2
// }: GroundPlaneProps): React.JSX.Element {
//   return (
//     <mesh
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={position}
//       receiveShadow
//     >
//       <planeGeometry args={size} />
//       <shadowMaterial opacity={opacity} />
//     </mesh>
//   );
// }

// interface LoadingIndicatorProps {
//   text?: string;
// }

// function LoadingIndicator({
//   text = "Use mouse to rotate, zoom, and pan the model"
// }: LoadingIndicatorProps): React.JSX.Element {
//   const styles: React.CSSProperties = {
//     position: 'absolute',
//     top: '660px',
//     // left: '20px',
//     color: 'white',
//     fontFamily: 'Arial, sans-serif',
//     fontSize: '14px',
//     background: 'rgba(0,0,0,0.5)',
//     padding: '10px',
//     borderRadius: '5px'
//   };

//   return <div style={styles}>{text}</div>;
// }

// export default function HandModel(): React.JSX.Element {
//   const containerStyles: React.CSSProperties = {
//     width: "100%",
//     height: "100vh"
//   };

//   const canvasProps = {
//     camera: { position: [0, 0, 3] as [number, number, number], fov: 50 },
//     shadows: false,
//     gl: {
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance" as const
//     }
//   };

//   const orbitControlsProps = {
//     enableDamping: true,
//     dampingFactor: 0.05,
//     minDistance: 1,
//     maxDistance: 10,
//     enablePan: false,
//     enableZoom: false,
//     enableRotate: true,
//     autoRotate: false // Disable auto-rotate since we're handling it manually
//   };

//   return (
//     <div style={containerStyles}>
//       <Canvas {...canvasProps} className="">
//         <Lighting />
       
//         <Suspense fallback={null}>
//           <HandModelComponent />
//         </Suspense>
       
//         <OrbitControls {...orbitControlsProps} />
//       </Canvas>
     
//       <LoadingIndicator />
//     </div>
//   );
// }

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

        mesh.material = new THREE.MeshStandardMaterial({
          color: materialColor,
          roughness: roughness,
          metalness: metalness,
        });

        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
  }, [obj]);

  // return <primitive ref={meshRef} object={obj} scale={0.1} />;
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
  const canvasProps = {
    camera: { position: [0, 0, 2.5] as [number, number, number], fov: 40 },
    shadows: false,
    gl: {
      antialias: true,
      alpha: true,
      powerPreference: "high-performance" as const,
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

  return (
    <div
      style={{
        width: "100%",
        height: "450px", // CONTROL height here!
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

