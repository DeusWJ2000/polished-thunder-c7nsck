import React, { useState, Suspense } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload } from "@react-three/drei";
import * as THREE from "three"; // Importamos Three.js

const Character = () => {
  const { scene } = useGLTF("/scene.glb");

  // Centrar el modelo en el origen y elevarlo
  const box = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();
  box.getCenter(center);
  scene.position.sub(center);
  scene.position.y += 1.5; // Ajustamos la altura del modelo para mejor visibilidad
  scene.scale.set(2, 2, 2); // Aumentamos el tamaño del modelo

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
};

const Game = ({ goBack }) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7", color: "#333" }}
    >
      {/* Barra superior */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <ArrowLeft
          size={24}
          color="#333"
          style={{ position: "absolute", left: "20px", cursor: "pointer" }}
          onClick={goBack}
        />
        <h1 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
          Game
        </h1>
        <Menu
          size={24}
          color="#333"
          style={{ position: "absolute", right: "20px", cursor: "pointer" }}
          onClick={() => setMostrarMenu(!mostrarMenu)}
        />
      </div>

      {/* Menú desplegable */}
      {mostrarMenu && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
            borderRadius: "5px",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Equipo", "Misiones", "Objetos", "Nivel", "Crafteo"].map(
              (item) => (
                <li
                  key={item}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Modelo 3D interactivo */}
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        {/* Alineación central del modelo */}
        <Canvas camera={{ position: [0, 2, 3] }}>
          {" "}
          {/* Ajustamos la cámara para mejor encuadre */}
          <OrbitControls enableZoom={false} target={[0, 1.5, 0]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Cargando modelo...</p>}
          >
            <Character />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
};

export default Game;
