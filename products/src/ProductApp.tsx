import styles from "./ProductApp.module.css";

export default function ProductApp() {
  return (
    <div className={styles.shelf}>
      <h2 className={styles.heading}>Products</h2>

      <div className={styles.product}>
        <h3 className={styles.name}>MacBook Pro</h3>
        <p className={styles.price}>$2,000</p>
        <button className={styles.add}>Add to Cart</button>
      </div>

      <div className={styles.product}>
        <h3 className={styles.name}>iPhone</h3>
        <p className={styles.price}>$1,000</p>
        <button className={styles.add}>Add to Cart</button>
      </div>

      <div className={styles.product}>
        <h3 className={styles.name}>iPad</h3>
        <p className={styles.price}>$1,500</p>
        <button className={styles.add}>Add to Cart</button>
      </div>
    </div>
  );
}
