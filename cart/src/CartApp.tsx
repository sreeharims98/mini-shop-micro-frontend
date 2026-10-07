import { useState } from "react";
import CartList from "./CartList";
import type { CartItem } from "./CartList";
import { usd } from "./usd";
import styles from "./CartApp.module.css";

// Mock cart contents until the cart is wired to real state.
const mockItems: CartItem[] = [
  { id: 1, name: "MacBook Pro", price: 2000, quantity: 1 },
  { id: 2, name: "iPhone", price: 1000, quantity: 2 },
];

export default function CartApp() {
  const [items, setItems] = useState(mockItems);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function setQuantity(id: number, quantity: number) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  return (
    <div className={styles.shelf}>
      <h2 className={styles.heading}>Cart</h2>

      <CartList items={items} onQuantityChange={setQuantity} />

      <div className={styles.total}>
        <p className={styles.name}>Total</p>
        <p className={styles.price}>{usd.format(total)}</p>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
}
