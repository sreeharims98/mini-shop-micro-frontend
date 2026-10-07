// Hand-written prop types for the remotes; update when a remote's props change.
// Ambient module blocks cannot use relative `import` statements, hence the import("...") type form.
declare module "products/ProductApp" {
  const ProductApp: import("react").ComponentType<{
    query?: string;
    cartIds?: number[];
    addToCart?: (product: import("../../shared/types").Product) => void;
  }>;
  export default ProductApp;
}

declare module "cart/CartApp" {
  const CartApp: import("react").ComponentType<{
    products?: import("../../shared/types").CartItem[];
    onQuantityChange?: (id: number, quantity: number) => void;
    onRemove?: (id: number) => void;
  }>;
  export default CartApp;
}
