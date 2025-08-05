import React from "react";

export default function Chips({ options, value, setValue }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((op) => (
        <button
          key={op.value}
          type="button"
          onClick={() => setValue(op.value)}
          style={{
            padding: "4px 12px",      
            borderRadius: 22,         
            border: "1px solid #e2e8f0",
            background: value === op.value ? "#b68652" : "#f1f5f9",
            color: value === op.value ? "#b45309" : "#444",
            fontWeight: 600,
            fontSize: 13,            
            boxShadow: value === op.value ? "0 2px 6px #ffa72633" : "none",
            borderColor: value === op.value ? "#ffc078" : "#e2e8f0",
            transition: "background 0.18s, color 0.18s",
            cursor: "pointer",
            minWidth: 56,            
            letterSpacing: 0.2,
          }}
        >
          {op.label}
        </button>
      ))}
    </div>
  );
}
