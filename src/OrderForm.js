import React, { useState } from "react";

export default function OrderForm({ product, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const order = {
      productId: product.id,
      productName: product.name,
      name,
      phone,
      address,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then(res => {
        if (!res.ok) throw new Error("Не вдалося зберегти замовлення");
        return res.json();
      })
      .then(() => setSubmitted(true))
      .catch(err => alert(err.message));
  };

  if (submitted)
    return (
      <div className="order-form">
        <h3>Дякуємо за замовлення!</h3>
        <button onClick={onClose}>Закрити</button>
      </div>
    );

  return (
    <div className="order-form">
      <h3>Замовлення: {product.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Телефон:
          <input
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </label>
        <label>
          Адреса доставки:
          <textarea
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <button type="submit">Підтвердити замовлення</button>
        <button type="button" onClick={onClose}>
          Відмінити
        </button>
      </form>
    </div>
  );
}
