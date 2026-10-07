import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Header from "./Header";
import styles from "./App.module.css";

const ProductApp = lazy(() => import("products/ProductApp"));
const CartApp = lazy(() => import("cart/CartApp"));

function App() {
  const onCart = useLocation().pathname === "/cart";
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className={styles.page}>
      <Header
        query={query}
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
            <Route path="/cart" element={<CartApp />} />
            <Route path="*" element={<ProductApp query={query} />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
