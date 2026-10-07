import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import type { CartItem, Product } from "../../shared/types";
import Header from "./Header";
import styles from "./App.module.css";

const ProductApp = lazy(() => import("products/ProductApp"));
const CartApp = lazy(() => import("cart/CartApp"));

function App() {
  const onCart = useLocation().pathname === "/cart";
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { ...product, quantity: 1 }],
    );
  }

  function setQuantity(id: number, quantity: number) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.page}>
      <Header
        query={query}
        cartCount={items.reduce((sum, item) => sum + item.quantity, 0)}
        onQueryChange={(next) => {
          setQuery(next);
          if (onCart) navigate("/");
        }}
      />
      <main>
        <Suspense
          fallback={
            <p className={styles.loading}>
              {onCart ? "Loading cart…" : "Loading products…"}
            </p>
          }
        >
          <Routes>
            <Route
              path="/cart"
              element={
                <CartApp
                  products={items}
                  onQuantityChange={setQuantity}
                  onRemove={removeFromCart}
                />
              }
            />
            <Route
              path="*"
              element={
                <ProductApp
                  query={query}
                  cartIds={items.map((item) => item.id)}
                  addToCart={addToCart}
                />
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
