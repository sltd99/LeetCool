import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

function TextMesh(props) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.z += 0.01;
    mesh.current.geometry.center();
  });

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);

  // configure font geometry
  const textOptions = {
    font,
    size: 10,
    height: 1,
  };

  const three_texture = new THREE.TextureLoader().load(texture);
  three_texture.wrapS = THREE.RepeatWrapping;
  three_texture.wrapT = THREE.RepeatWrapping;
  three_texture.repeat.set(0.1, 0.1);

  return (
    <mesh position={[0, 0, -10]} ref={mesh}>
      <textGeometry attach="geometry" args={["three.js", textOptions]} />
      <meshBasicMaterial attach="material" args={{ map: three_texture }} />
    </mesh>
  );
}

export default function Logo() {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
      }}
      camera={{ position: [0, 0, 10] }}
    >
      <TextMesh />
    </Canvas>
  );
}
