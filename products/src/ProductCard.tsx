import type { Product } from "../../shared/types";
import styles from "./ProductCard.module.css";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({
  product,
  inCart,
  addToCart,
}: {
  product: Product;
  inCart: boolean;
  addToCart?: (product: Product) => void;
}) {
  return (
    <li className={styles.card}>
      <img
        className={styles.image}
        src={product.thumbnail}
        alt=""
        width={300}
        height={300}
        loading="lazy"
      />
      <p className={styles.brand}>{product.brand ?? product.category}</p>
      <h3 className={styles.name}>{product.title}</h3>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.meta}>
        <span
          role="img"
          aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
        >
          ★ {product.rating.toFixed(1)}
        </span>
        <span>{product.availabilityStatus}</span>
      </p>
      <p className={styles.price}>{usd.format(product.price)}</p>
      {/* Stays clickable once added: another click adds one more. */}
      <button
        className={inCart ? `${styles.add} ${styles.added}` : styles.add}
        onClick={() => addToCart?.(product)}
      >
        {inCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </li>
  );
}
