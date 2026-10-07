import styles from "./ProductCard.module.css";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  rating: number;
  availabilityStatus: string;
  thumbnail: string;
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }: { product: Product }) {
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
      <button className={styles.add}>Add to Cart</button>
    </li>
  );
}
