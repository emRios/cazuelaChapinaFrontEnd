import React, { useState } from "react";
import Chips from "./Chips"; 

const opcionesBebidas = {
  tipos: ["elote", "shuco", "pinol", "cacao"],
  tamanios: ["vaso", "jarro"],
  endulzantes: ["panela", "miel", "ninguno"],
  toppings: ["ninguno", "malvaviscos", "canela", "cacao"],
};

const LABELS = {
  tipos: {
    elote: "Atol de elote",
    shuco: "Atole shuco",
    pinol: "Pinol",
    cacao: "Cacao batido",
  },
  tamanios: {
    vaso: "Vaso 12 oz",
    jarro: "Jarro 1 L",
  },
  endulzantes: {
    panela: "Panela",
    miel: "Miel",
    ninguno: "Sin azúcar",
  },
  toppings: {
    ninguno: "Sin topping",
    malvaviscos: "Malvaviscos",
    canela: "Canela",
    cacao: "Ralladura de cacao",
  },
};

function mapOptions(arr, dict) {
  return arr.map((val) => ({
    value: val,
    label: dict[val] || val.charAt(0).toUpperCase() + val.slice(1),
  }));
}

const BebidaSelector = ({ onAdd }) => {
  const [tipo, setTipo] = useState(null);
  const [tamanio, setTamanio] = useState(null);
  const [endulzante, setEndulzante] = useState(null);
  const [topping, setTopping] = useState(null);

  const handleAdd = () => {
    const bebida = {
      tipo: "bebida",
      tamanio,
      bebida: tipo,
      endulzante,
      topping,
      cantidad: 1,
    };
    onAdd(bebida);
    setTipo(opcionesBebidas.tipos[0]);
    setTamanio(opcionesBebidas.tamanios[0]);
    setEndulzante(opcionesBebidas.endulzantes[0]);
    setTopping(opcionesBebidas.toppings[0]);
  };

  return (
    <div className="container">
      <div className="personalizar">
        <div className="contenedor-recuadro">
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight">
              Personaliza tu Bebida
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "8px",    
                marginBottom: "6px",
                background: "#f8fafb",
                borderRadius: 14,
                padding: "10px 10px 4px 10px", 
                boxShadow: "0 2px 10px #edd4b955",
              }}
            >
              <Chips
                options={mapOptions(opcionesBebidas.tipos, LABELS.tipos)}
                value={tipo}
                setValue={setTipo}
                label="Tipo"
              />
              <Chips
                options={mapOptions(opcionesBebidas.tamanios, LABELS.tamanios)}
                value={tamanio}
                setValue={setTamanio}
                label="Tamaño"
              />
              <Chips
                options={mapOptions(opcionesBebidas.endulzantes, LABELS.endulzantes)}
                value={endulzante}
                setValue={setEndulzante}
                label="Endulzante"
              />
              <Chips
                options={mapOptions(opcionesBebidas.toppings, LABELS.toppings)}
                value={topping}
                setValue={setTopping}
                label="Topping"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAdd}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-2xl shadow"
                  style={{ fontSize: 16, minWidth: 170 }}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BebidaSelector;