import React, { useState } from "react";

function Chips({ options, value, setValue, label }) {
  return (
    <div>
      <div>{label}</div>
      <div style={{ display: "flex", gap: "8px" }}>
        {options.map((op) => (
          <button
            key={op.value}
            type="button"
            onClick={() => setValue(op.value)}
            style={{
              padding: "8px 20px",
              borderRadius: 30,
              border: "1px solid",
              background: value === op.value ? "orange" : "#f5f5f5",
              color: value === op.value ? "#fff" : "#333",
              fontWeight: "bold",
            }}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChipsTest() {
  const [masa, setMasa] = useState("amarillo");
  const [relleno, setRelleno] = useState("cerdo");

  const masas = [
    { value: "amarillo", label: "Maíz amarillo" },
    { value: "blanco", label: "Maíz blanco" },
    { value: "arroz", label: "Arroz" },
  ];
  const rellenos = [
    { value: "cerdo", label: "Cerdo" },
    { value: "pollo", label: "Pollo" },
    { value: "chipilin", label: "Chipilín" },
    { value: "mixto", label: "Mixto" },
  ];

  return (
    <div style={{ padding: 40 }}>
      <Chips options={masas} value={masa} setValue={setMasa} label="Masa" />
      <div style={{ height: 30 }} />
      <Chips options={rellenos} value={relleno} setValue={setRelleno} label="Relleno" />
    </div>
  );
}
