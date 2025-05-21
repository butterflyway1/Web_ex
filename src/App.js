import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Замовлення товарів</h1>
      <div className="product-list">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p>Ціна: {p.price} грн</p>
            <button onClick={() => setOrderProduct(p)}>Замовити</button>
          </div>
        ))}
      </div>

      {orderProduct && (
        <OrderForm product={orderProduct} onClose={() => setOrderProduct(null)} />
      )}
    </div>
  );
}

export default App;
