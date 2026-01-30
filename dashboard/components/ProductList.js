import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      <h3>Productos</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Categorías: {product.categories.map(c => c.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
