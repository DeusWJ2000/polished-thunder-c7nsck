import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { ArrowLeft, User, Menu, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Importar imágenes correctamente
import imagenXJuarez from "./imagenes/xjuarez.jpeg";
import imagenJuanGabriel from "./imagenes/juan_gabriel.jpeg";
import imagenCentral from "./imagenes/central.jpg";
import imagenMuseo from "./imagenes/museo.jpg";
import imagenRodadora from "./imagenes/rodadora.jpeg";
import perfilUsuario from "./imagenes/perfil.jpg";

// Datos de las misiones en el mapa
const lugares = [
  {
    id: 1,
    nombre: "La 'X' de Juárez",
    lat: 31.7311,
    lng: -106.4413,
    imagen: imagenXJuarez,
    xp: 150,
    tipo: "S",
  },
  {
    id: 2,
    nombre: "Casa de Juan Gabriel",
    lat: 31.7392,
    lng: -106.4858,
    imagen: imagenJuanGabriel,
    xp: 120,
    tipo: "A",
  },
  {
    id: 3,
    nombre: "Parque Central",
    lat: 31.7135,
    lng: -106.4093,
    imagen: imagenCentral,
    xp: 130,
    tipo: "B",
  },
  {
    id: 4,
    nombre: "Museo de Arqueología de El Chamizal",
    lat: 31.7686,
    lng: -106.4438,
    imagen: imagenMuseo,
    xp: 140,
    tipo: "C",
  },
  {
    id: 5,
    nombre: "La Rodadora",
    lat: 31.6534,
    lng: -106.4268,
    imagen: imagenRodadora,
    xp: 160,
    tipo: "D",
  },
];

// Función para crear un ícono personalizado
const createCustomIcon = (imagenUrl) => {
  return new L.Icon({
    iconUrl: imagenUrl,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
  });
};

const Mapa = ({ goBack }) => {
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [misiones, setMisiones] = useState(lugares); // Misiones activas
  const [misionesCompletadas, setMisionesCompletadas] = useState([]); // Misiones completadas
  const [mostrarMisiones, setMostrarMisiones] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [xpTotal, setXpTotal] = useState(0);
  const [misionesClasificadas, setMisionesClasificadas] = useState({
    S: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  });

  // Función para aceptar misión
  const aceptarMision = () => {
    if (
      lugarSeleccionado &&
      !misionesCompletadas.some((m) => m.id === lugarSeleccionado.id)
    ) {
      setMisiones(misiones.filter((m) => m.id !== lugarSeleccionado.id)); // Eliminar misión de las activas
      setMisionesCompletadas([...misionesCompletadas, lugarSeleccionado]); // Añadir misión a las completadas
    }
  };

  // Función para completar misión
  const completarMision = (mision) => {
    // Actualizamos el contador de misiones completadas
    setMisionesClasificadas((prev) => {
      const nuevaMision = { ...prev, [mision.tipo]: prev[mision.tipo] + 1 }; // Aumentamos el contador del tipo de misión
      setXpTotal(xpTotal + mision.xp); // Aumentar XP total
      return nuevaMision;
    });

    // Filtramos la misión completada de la lista de misiones activas
    setMisionesCompletadas(
      misionesCompletadas.filter((m) => m.id !== mision.id)
    ); // Eliminar misión completada de la lista
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Barra superior */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ArrowLeft
          size={24}
          color="#333"
          style={{ cursor: "pointer" }}
          onClick={goBack}
        />
        <h1
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={() => setMostrarPerfil(!mostrarPerfil)} // Alterna la visibilidad del perfil
        >
          MAPA
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <User
            size={24}
            color="#333"
            style={{ cursor: "pointer" }}
            onClick={() => setMostrarPerfil(!mostrarPerfil)} // Alterna la visibilidad del perfil
          />
          <Menu
            size={24}
            color="#333"
            style={{ cursor: "pointer" }}
            onClick={() => setMostrarMisiones(!mostrarMisiones)} // Alterna la visibilidad de las misiones
          />
        </div>
      </div>

      {/* Mapa interactivo */}
      <MapContainer
        center={[31.7386, -106.4851]}
        zoom={13}
        style={{ width: "100%", height: "calc(100vh - 60px)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {misiones.map((lugar) => (
          <Marker
            key={lugar.id}
            position={[lugar.lat, lugar.lng]}
            icon={createCustomIcon(lugar.imagen)}
            eventHandlers={{ click: () => setLugarSeleccionado(lugar) }}
          />
        ))}
      </MapContainer>

      {/* Ventana de perfil */}
      {mostrarPerfil && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
            width: "350px", // Aumentamos el ancho
            borderRadius: "10px",
            zIndex: 9999, // Aseguramos que esté por encima de otros elementos
            maxHeight: "400px", // Limitar la altura máxima para que no se desborde
            overflowY: "auto", // Permitir desplazamiento si el contenido es largo
            color: "black", // Aseguramos que el texto sea visible
            textAlign: "left", // Alineación del texto
          }}
        >
          <h3>Fabricio</h3>
          <img
            src={perfilUsuario}
            alt="Perfil"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>Nivel: {Math.floor(xpTotal / 1000)}</p>
          <p>XP: {xpTotal}</p>
          <p>Misiones Completadas:</p>
          {Object.entries(misionesClasificadas).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
          <button onClick={() => setMostrarPerfil(false)}>Cerrar</button>
        </div>
      )}

      {/* Ventana de misiones */}
      {mostrarMisiones && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
            width: "350px", // Aumentamos el ancho
            borderRadius: "10px",
            maxHeight: "80%",
            overflowY: "scroll",
            zIndex: 9999, // Aseguramos que esté por encima de otros elementos
            color: "black", // Aseguramos que el texto sea visible
            textAlign: "left", // Alineación del texto
          }}
        >
          <h3>Misiones</h3>
          {misionesCompletadas.map((mision) => (
            <div
              key={mision.id}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={mision.imagen}
                alt={mision.nombre}
                style={{ width: "50px", borderRadius: "50%" }}
              />
              <div>
                <p>{mision.nombre}</p>
                <p>{`Misión Clase ${mision.tipo}`}</p>{" "}
                {/* Aquí mostramos la clase de la misión */}
                <p>{mision.xp} XP</p>
              </div>
              <button
                onClick={() => completarMision(mision)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Completar
              </button>
            </div>
          ))}
          <button onClick={() => setMostrarMisiones(false)}>Cerrar</button>
        </div>
      )}

      {/* Ventana de misión */}
      {lugarSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
            textAlign: "center",
            zIndex: 1000,
            color: "black",
            width: "300px", // Ajuste del ancho
          }}
        >
          <X
            size={24}
            color="#333"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() => setLugarSeleccionado(null)}
          />
          <h2>{lugarSeleccionado.nombre}</h2>
          <img
            src={lugarSeleccionado.imagen}
            alt={lugarSeleccionado.nombre}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
          <p>
            Descubre las runas secretas de WJ en este lugar y escanéalas para
            descifrar el mensaje secreto. ¿Podrás completar la misión?
          </p>
          <p>
            <strong>{`Misión Clase ${lugarSeleccionado.tipo}`}</strong>{" "}
            {/* Mostramos la clase de la misión */}
          </p>
          <p>+{lugarSeleccionado.xp} XP</p>
          {/* Ocultar el botón si ya está completada */}
          {misionesCompletadas.some((m) => m.id === lugarSeleccionado.id) ? (
            <button
              disabled
              style={{
                padding: "10px 15px",
                backgroundColor: "#ccc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "not-allowed",
              }}
            >
              Misión Completada
            </button>
          ) : (
            <button
              onClick={aceptarMision}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Aceptar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Mapa;
