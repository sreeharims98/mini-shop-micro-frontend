import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "./ProductCard";
import styles from "./ProductApp.module.css";

export default function ProductApp({ query = "" }: { query?: string }) {
  const [products, setProducts] = useState<Product[]>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://dummyjson.com/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data: { products: Product[] }) => setProducts(data.products))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });

    return () => controller.abort();
  }, []);

  // ponytail: filters only the 30 products fetched; switch to /products/search?q= when search must cover the full catalogue.
  const search = query.trim();
  const matches = products?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={styles.shelf}>
      <h2 className={styles.heading}>Products</h2>

      <ul className={styles.grid}>
        {matches?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      {failed && (
        <p className={styles.empty}>
          Products could not be loaded. Check your connection and reload the
          page.
        </p>
      )}
      {!failed && !matches && (
        <p className={styles.empty}>Loading products…</p>
      )}
      {matches?.length === 0 && (
        <p className={styles.empty}>
          No products match “{search}”. Try a shorter search.
        </p>
      )}
    </div>
  );
}
