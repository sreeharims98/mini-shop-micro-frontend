import type { CartItem } from "../../shared/types";
import { usd } from "./usd";
// Shares the cart stylesheet: the total row in CartApp reuses the same name and price styles.
import styles from "./CartApp.module.css";

export default function CartList(props: {
  items: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  return props.items.map((item) => (
    <div key={item.id} className={styles.line}>
      <img
        className={styles.image}
        src={item.thumbnail}
        alt=""
        width={96}
        height={96}
      />
      <div className={styles.details}>
        <p className={styles.brand}>{item.brand ?? item.category}</p>
        <h3 className={styles.name}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.meta}>
          <span
            role="img"
            aria-label={`Rated ${item.rating.toFixed(1)} out of 5`}
          >
            ★ {item.rating.toFixed(1)}
          </span>
          <span>{item.availabilityStatus}</span>
        </p>
      </div>
      <p className={styles.quantity}>
        <select
          className={styles.select}
          aria-label={`Quantity of ${item.title}`}
          value={item.quantity}
          onChange={(event) =>
            props.onQuantityChange(item.id, Number(event.target.value))
          }
        >
          {/* Offers 1 to 10, or up to the current quantity when Add to Cart pushed it higher. */}
          {Array.from(
            { length: Math.max(10, item.quantity) },
            (_, index) => (
              <option key={index}>{index + 1}</option>
            ),
          )}
        </select>{" "}
        × {usd.format(item.price)}
      </p>
      <p className={styles.price}>{usd.format(item.price * item.quantity)}</p>
      <button
        className={styles.remove}
        aria-label={`Remove ${item.title}`}
        onClick={() => props.onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  ));
}
