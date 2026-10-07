import { usd } from "./usd";
// Shares the cart stylesheet: the total row in CartApp reuses the same name and price styles.
import styles from "./CartApp.module.css";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const quantities = Array.from({ length: 10 }, (_, index) => index + 1);

export default function CartList(props: {
  items: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
}) {
  return props.items.map((item) => (
    <div key={item.id} className={styles.line}>
      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.quantity}>
        <select
          className={styles.select}
          aria-label={`Quantity of ${item.name}`}
          value={item.quantity}
          onChange={(event) =>
            props.onQuantityChange(item.id, Number(event.target.value))
          }
        >
          {quantities.map((quantity) => (
            <option key={quantity}>{quantity}</option>
          ))}
        </select>{" "}
        × {usd.format(item.price)}
      </p>
      <p className={styles.price}>{usd.format(item.price * item.quantity)}</p>
    </div>
  ));
}
