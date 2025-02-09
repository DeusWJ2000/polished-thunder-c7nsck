import React, { useState } from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react"; // Íconos de flecha y menú

interface EventosProps {
  goBack: () => void; // Función para regresar a la pantalla principal
}

const Eventos: React.FC<EventosProps> = ({ goBack }) => {
  const [backgroundColor, setBackgroundColor] = useState("#f7f7f7"); // Estado para el color de fondo
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable

  // Función para cambiar el color según la opción seleccionada
  const handleMenuClick = (color: string) => {
    setBackgroundColor(color);
    setMenuOpen(false); // Cierra el menú después de seleccionar
  };

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
        {/* Flecha para regresar */}
        <div
          style={{
            position: "absolute",
            left: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={goBack}
        >
          <ArrowLeft size={24} color="#333" />
        </div>

        {/* Título centrado */}
        <h1 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
          Eventos
        </h1>

        {/* Ícono de menú */}
        <div
          style={{
            position: "absolute",
            right: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setMenuOpen(!menuOpen)} // Alternar el menú
        >
          <MoreHorizontal size={24} color="#333" />
        </div>
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px", // Debajo de la barra superior
            right: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            width: "200px",
          }}
        >
          {/* Opciones del menú */}
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <li
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#d62828",
              }}
              onClick={() => handleMenuClick("#FFDDC1")} // Color para Furinkazan
            >
              Furinkazan
            </li>
            <li
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#0077b6",
              }}
              onClick={() => handleMenuClick("#C1E1FF")} // Color para Wunjo Kaunas
            >
              Wunjo Kaunas
            </li>
            <li
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#f77f00",
              }}
              onClick={() => handleMenuClick("#FFE5C1")} // Color para Epsilon
            >
              Epsilon
            </li>
            <li
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "#38b000",
              }}
              onClick={() => handleMenuClick("#C1FFC1")} // Color para Wanderlust Jouska
            >
              Wanderlust Jouska
            </li>
          </ul>
        </div>
      )}

      {/* Contenido principal con color dinámico */}
      <div
        style={{
          padding: "2rem",
          backgroundColor: backgroundColor, // Color de fondo dinámico
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1rem", color: "#666" }}>
          Cambia el fondo seleccionando una opción del menú.
        </p>
      </div>
    </div>
  );
};

export default Eventos;
