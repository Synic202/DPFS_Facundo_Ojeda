import React, { useEffect, useState } from "react";
import Panel from "./components/Panel";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";

function App() {
  const [usersData, setUsersData] = useState({ users: [], count: 0 });
  const [productsData, setProductsData] = useState({ products: [], count: 0, countByCategory: {} });
  
  useEffect(() => {
    
    fetch("http://localhost:3000/api/users")
    .then(res => res.json())
    .then(data => setUsersData({ users: data.users, count: data.count }));
    
    
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => setProductsData({ products: data.products, count: data.count, countByCategory: data.countByCategory }));
  }, []);
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dashboard</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Panel title="Total de Usuarios" value={usersData.count} />
        <Panel title="Total de Productos" value={productsData.count} />
        <Panel title="Categorías">
          <ul>
            {Object.entries(productsData.countByCategory).map(([cat, count]) => (
              <li key={cat}>{cat}: {count}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Último Usuario">
          {usersData.users.length > 0 && (
            <p>{usersData.users[usersData.users.length - 1].name}</p>
          )}
        </Panel>
        <Panel title="Último Producto">
          {productsData.products.length > 0 && (
            <p>{productsData.products[productsData.products.length - 1].name}</p>
          )}
        </Panel>
      </div>

      <div style={{ marginTop: "20px" }}>
        <UserList users={usersData.users} />
        <ProductList products={productsData.products} />
      </div>
    </div>
  );
}

export default App;

