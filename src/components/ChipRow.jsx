import React from "react";

export default function ChipRow({ label, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        minHeight: 36,
        marginBottom: 2
      }}
    >
      <span
        style={{
          minWidth: 80,            
          color: "#bdbdbd",       
          fontWeight: 500,
          fontSize: 13,           
          marginRight: 6,
          userSelect: "none",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}
