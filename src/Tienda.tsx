import React, { useState } from "react";
import { ArrowLeft, ShoppingCart, Plus, Minus, X, Trash2 } from "lucide-react";
import fn from "./imagenes/fn.jpg";
import bs from "./imagenes/bs.jpg";
import nr from "./imagenes/nr.jpg";
import wj from "./imagenes/wj.jpg";

const productosIniciales = [
  {
    id: 1,
    nombre: "FURINKAZAN",
    imagen: fn,
    descripcion: "Energía y fuerza inquebrantable.",
    precio: 300,
    disponible: 1000,
  },
  {
    id: 2,
    nombre: "BERKANA SOWELU",
    imagen: bs,
    descripcion: "Renacimiento y luz interior.",
    precio: 300,
    disponible: 1000,
  },
  {
    id: 3,
    nombre: "NITOFILI RESILENCE",
    imagen: nr,
    descripcion: "Resistencia y poder oculto.",
    precio: 300,
    disponible: 1000,
  },
  {
    id: 4,
    nombre: "WANDERLUST JOUSKA",
    imagen: wj,
    descripcion: "Aventura e innovación.",
    precio: 300,
    disponible: 1000,
  },
];

const Tienda = ({ goBack }) => {
  const [productos, setProductos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (productoId) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === productoId);
      if (existe) {
        return prev.map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      const producto = productos.find((p) => p.id === productoId);
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoId && prod.disponible > 0
          ? { ...prod, disponible: prod.disponible - 1 }
          : prod
      )
    );
  };

  const modificarCantidad = (id, delta) => {
    setCarrito((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            if (nuevaCantidad > 0) {
              return { ...item, cantidad: nuevaCantidad };
            }
            return null;
          }
          return item;
        })
        .filter(Boolean);
    });

    setProductos((prev) => {
      return prev.map((prod) => {
        if (prod.id === id) {
          const enCarrito =
            carrito.find((item) => item.id === id)?.cantidad || 0;
          const nuevaDisponibilidad = prod.disponible - delta;

          if (nuevaDisponibilidad >= 0 && enCarrito + delta >= 0) {
            return { ...prod, disponible: nuevaDisponibilidad };
          }
        }
        return prod;
      });
    });
  };

  const eliminarDelCarrito = (id, cantidad) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === id
          ? { ...prod, disponible: prod.disponible + cantidad }
          : prod
      )
    );
  };

  const comprar = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7", color: "#333" }}
    >
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
          Tienda
        </h1>
        <ShoppingCart
          size={24}
          color="#333"
          style={{ position: "absolute", right: "20px", cursor: "pointer" }}
          onClick={() => setMostrarCarrito(true)}
        />
      </div>

      <div style={{ padding: "2rem" }}>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              marginBottom: "1rem",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ width: "80px", height: "80px", borderRadius: "8px" }}
            />
            <div style={{ flex: 1, paddingLeft: "1rem" }}>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>
                <strong>Disponibles:</strong> {producto.disponible}
              </p>
              <p>
                <strong>Precio:</strong> ${producto.precio} MXN
              </p>
            </div>
            <ShoppingCart
              size={28}
              color="#666"
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
              onClick={() => agregarAlCarrito(producto.id)}
            />
          </div>
        ))}
      </div>

      {mostrarCarrito && (
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
            zIndex: 1000,
            width: "80%",
            maxWidth: "400px",
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
            onClick={() => setMostrarCarrito(false)}
          />
          <h2>Carrito</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                />
                <p>{item.nombre}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Minus
                    size={20}
                    color="#333"
                    onClick={() => modificarCantidad(item.id, -1)}
                    style={{ cursor: "pointer" }}
                  />
                  <p>{item.cantidad}</p>
                  <Plus
                    size={20}
                    color="#333"
                    onClick={() => modificarCantidad(item.id, 1)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Trash2
                  size={20}
                  color="red"
                  onClick={() => eliminarDelCarrito(item.id, item.cantidad)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))
          )}
          <p>
            <strong>Total:</strong> ${totalCarrito} MXN
          </p>
          <button
            onClick={comprar}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default Tienda;
