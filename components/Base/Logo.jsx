import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

export default function Logo() {
  return (
    <Canvas style={{ height: "10vh", width: "10vw" }}>
      <ambientLight />

      <pointLight position={[10, 10, 10]} />
      <Text scale={30} color="black" anchorX="center" anchorY="middle">
        Leetcool
      </Text>
      <OrbitControls />
    </Canvas>
  );
}
