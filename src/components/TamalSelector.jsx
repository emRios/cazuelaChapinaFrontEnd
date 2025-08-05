import React, { useState, useCallback } from "react";
import LLMAsistente from "./LLMAsistente"; 
import ChipRow from "./ChipRow";
import Chips from "./Chips";



// --- Opciones y helpers ---
const opcionesMock = {
  tamales: {
    masas: ["amarillo", "blanco", "arroz"],
    rellenos: ["cerdo", "pollo", "chipilin", "mixto"],
    envolturas: ["platano", "tusa"],
    picantes: ["sin", "suave", "chapin"],
  },
  bebidas: {
    tipos: ["elote", "shuco", "pinol", "cacao"],
    tamanios: ["vaso", "jarro"],
    endulzantes: ["panela", "miel", "ninguno"],
    toppings: ["ninguno", "malvaviscos", "canela", "cacao"],
  },
};

const LABELS = {
  masas: {
    amarillo: "Maíz amarillo",
    blanco: "Maíz blanco",
    arroz: "Arroz",
  },
  rellenos: {
    cerdo: "Recado rojo de cerdo",
    pollo: "Negro de pollo",
    chipilin: "Chipilín vegetariano",
    mixto: "Estilo chuchito (mixto)",
  },
  envolturas: {
    platano: "Hoja de plátano",
    tusa: "Tusa de maíz",
  },
  picantes: {
    sin: "Sin chile",
    suave: "Suave",
    chapin: "Chapín",
  },
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

const opcionesCantidad = [
  { value: 1, label: "Unidad" },
  { value: 6, label: "Media docena" },
  { value: 12, label: "Docena" },
];

function mapOptions(arr, dict) {
  return arr.map((val) => ({
    value: val,
    label: dict[val] || val.charAt(0).toUpperCase() + val.slice(1),
  }));
}

const TamalesSelector = React.memo(({ onAdd }) => {


  const [opciones] = useState(opcionesMock);
  const [cantidad, setCantidad] = useState(null);
  const [masa, setMasa] = useState(null);
  const [relleno, setRelleno] = useState(null);
  const [envoltura, setEnvoltura] = useState(null);
  const [picante, setPicante] = useState(null);
  const [tipoBebida, setTipoBebida] = useState(null);
  const [tamanio, setTamanio] = useState(null);
  const [endulzante, setEndulzante] = useState(null);
  const [topping, setTopping] = useState(null);
  const [mostrarLLM, setMostrarLLM] = useState(false);

  const handleSugerenciaLLM = useCallback(
    (items) => items.forEach(onAdd),
    [onAdd]
  );

  const handleAdd = () => {
    const itemTamal = { tipo: "tamal", cantidad, masa, relleno, envoltura, picante };
    const itemBebida = { tipo: "bebida", bebida: tipoBebida, tamanio, endulzante, topping, cantidad: 1 };
    onAdd(itemTamal);
    onAdd(itemBebida);
    setCantidad(null);
    setMasa(null);
    setRelleno(null);
    setEnvoltura(null);
    setPicante(null);
    setTipoBebida(null);
    setTamanio(null);
    setEndulzante(null);
    setTopping(null);
  };

  return (
    <div className="container">

      <div className="iaAssistant">
        <div className="contenedor-recuadro" style={{ display: mostrarLLM ? "block" : "none" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-[#9b7a50]">Asistente IA</span>
            <label className="flex items-center gap-2 text-gray-700 font-medium" style={{ fontSize: 13 }}>
              <input
                type="checkbox"
                checked={mostrarLLM}
                onChange={() => setMostrarLLM((v) => !v)}
                className="accent-orange-600 w-5 h-5"
              />
              Mostrar
            </label>
          </div>
          <LLMAsistente onSugerencia={handleSugerenciaLLM} />
        </div>
        {/* Botón para mostrar si está oculto */}
        {!mostrarLLM && (
          <div className="contenedor-recuadro" style={{ padding: "12px 24px", marginTop: 0 }}>
            <div className="flex justify-end">
              <button
                onClick={() => setMostrarLLM(true)}
                className="text-[#9b7a50] bg-[#f1f1f4] px-4 py-2 rounded-lg font-medium border border-[#d3cfc7] shadow-sm hover:bg-[#e8e7e3] transition"
                style={{ fontSize: 14 }}
              >
                Activar Asistente IA
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ----- Personalización Tamal y Bebida ----- */}
      <div className="personalizar">
        <div className="contenedor-recuadro">
          {/* --- Tamal --- */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight">
              Personaliza tu Tamal
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
              <ChipRow label="Cantidad">
              <Chips options={opcionesCantidad} value={cantidad} setValue={setCantidad}  />
              </ChipRow>
              <ChipRow label="Tipo de masa">
              <Chips options={mapOptions(opciones.tamales.masas, LABELS.masas)} value={masa} setValue={setMasa}  />
              </ChipRow>
              <ChipRow label="Relleno">
              <Chips options={mapOptions(opciones.tamales.rellenos, LABELS.rellenos)} value={relleno} setValue={setRelleno}  />
              </ChipRow>
              <ChipRow label="Envoltura">
              <Chips options={mapOptions(opciones.tamales.envolturas, LABELS.envolturas)} value={envoltura} setValue={setEnvoltura}  />
              </ChipRow>
              <ChipRow label="Envoltura">
              <Chips options={mapOptions(opciones.tamales.picantes, LABELS.picantes)} value={picante} setValue={setPicante}  />
              </ChipRow>
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
});

export default TamalesSelector;
