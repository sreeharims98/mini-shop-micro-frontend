import { lazy, Suspense } from "react";

const ProductApp = lazy(() => import("products/ProductApp"));

function App() {
  return (
    <div>
      <h1>My Micro Frontend Shop</h1>
      <hr />
      <Suspense fallback="Loading products…">
        <ProductApp />
      </Suspense>
    </div>
  );
}

export default App;
