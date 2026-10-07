import type { CartItem } from "../../shared/types";
import CartList from "./CartList";
import { usd } from "./usd";
import styles from "./CartApp.module.css";

// Cart state lives in the shell; every prop is optional so the cart also runs standalone (empty).
export default function CartApp({
  products = [],
  onQuantityChange = () => {},
  onRemove = () => {},
}: {
  products?: CartItem[];
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
}) {
  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.shelf}>
      <h2 className={styles.heading}>Cart</h2>

      <CartList
        items={products}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />

      {products.length === 0 && (
        <p className={styles.empty}>
          Your cart is empty. Add a product to see it here.
        </p>
      )}

      <div className={styles.total}>
        <p className={styles.name}>Total</p>
        <p className={styles.price}>{usd.format(total)}</p>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
}
