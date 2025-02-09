import React, { useState } from "react";
import Tienda from "./Tienda";
import Mapa from "./Mapa";
import Game from "./Game";
import Eventos from "./Eventos";
import imagen2 from "./imagenes/imagen2.jpg";
import imagen3 from "./imagenes/imagen3.jpg";
import imagen4 from "./imagenes/imagen4.jpg";
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "tienda":
        return <Tienda goBack={() => setCurrentPage("home")} />;
      case "Mapa":
        return <Mapa goBack={() => setCurrentPage("home")} />;
      case "game":
        return <Game goBack={() => setCurrentPage("home")} />;
      case "eventos":
        return <Eventos goBack={() => setCurrentPage("home")} />;
      default:
        return (
          <div
            style={{
              backgroundImage: `url(${imagen4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
              backgroundColor: `color`,
              color: "white",
            }}
          >
            {/* Fondo con imagen y título */}
            <div
              style={{
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  textShadow: "2px 2px 10px black",
                }}
              >
                Wanderlust Jouska
              </h1>
            </div>

            {/* Recuadros */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <div
                onClick={() => setCurrentPage("tienda")}
                style={recuadroStyle("#0077b6")}
              >
                Tienda
              </div>
              <div
                onClick={() => setCurrentPage("Mapa")}
                style={recuadroStyle("#d62828")}
              >
                Mapa
              </div>
              <div
                onClick={() => setCurrentPage("game")}
                style={recuadroStyle("#f77f00")}
              >
                Game
              </div>
              <div
                onClick={() => setCurrentPage("eventos")}
                style={recuadroStyle("#38b000")}
              >
                Eventos
              </div>
            </div>
          </div>
        );
    }
  };

  return renderPage();
};

// Estilos para los recuadros
const recuadroStyle = (color: string) => ({
  width: "70vw",
  height: "15vh",
  background: "rgba(0, 0, 0, 0.5)",
  margin: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "10px",
  cursor: "pointer",
  color: "white",
  textAlign: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
});

export default App;
