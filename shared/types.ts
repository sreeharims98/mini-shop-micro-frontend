// Types shared by shell, products and cart. Import with `import type` only:
// the import is erased at build time, so no app bundles another app's code.

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

// A cart line is the whole product plus how many, so the cart can show image, brand and stock.
export type CartItem = Product & { quantity: number };
