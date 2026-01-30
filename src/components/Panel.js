import React from "react";

const Panel = ({ title, value, children }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", margin: "10px" }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
      {children}
    </div>
  );
};

export default Panel;
