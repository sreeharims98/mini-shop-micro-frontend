# Mini Shop

A small online shop built as micro-frontends. Three separate React apps are stitched together in the browser with Module Federation: a shell that hosts the page, a products app and a cart app.

Built with React 19, TypeScript, Vite 8, [`@module-federation/vite`](https://github.com/module-federation/vite) and React Router. Product data comes from the public [DummyJSON](https://dummyjson.com/products) API.

## Features

- Product grid with image, brand, description, rating, stock status and price
- Search box in the header that filters products as you type
- Add to Cart, with the button showing when a product is already in the cart
- Cart count in the header
- Cart page on its own route (`/cart`) with a quantity dropdown, remove button and running total
- Layout that works from phone width up to full desktop width

## Apps

| App | Role | Port | Exposes |
|---|---|---|---|
| `shell` | Host: header, routing, cart state | 3000 | — |
| `products` | Remote: product grid | 3001 | `products/ProductApp` |
| `cart` | Remote: cart page | 3004 | `cart/CartApp` |

Each app is a standalone Vite project with its own `package.json` and dependencies. `shared/` holds TypeScript types used by all three.

## Getting started

You need Node.js 20.19 or newer.

From the repo root:

```bash
npm install          # root tooling only
npm run install:all  # dependencies for shell, products and cart
npm run dev          # all three dev servers in one terminal
```

Open <http://localhost:3000>. The shell loads the two remotes from ports 3001 and 3004, so all three servers must be running. The products and cart apps also open on their own ports if you want to work on one in isolation.

## Scripts

From the repo root, for all three apps at once:

| Command | What it does |
|---|---|
| `npm run install:all` | Install each app's dependencies |
| `npm run dev` | Start all three dev servers with labelled output |
| `npm run lint` | Lint every app |
| `npm run typecheck` | Typecheck every app |
| `npm run build` | Production build of every app |

The root `package.json` holds tooling only. Each app still installs, runs and builds on its own.

Inside any single app folder:

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Lint with oxlint |
| `npx tsc -b` | Typecheck |

Only the shell's `build` script typechecks. In `products` and `cart`, run `npx tsc -b` yourself.

## How it fits together

```
                    shell (3000)
        header · routes · search and cart state
                 /                  \
          props /                    \ props
               v                      v
     products (3001)              cart (3004)
     fetches and shows            shows cart items,
     the product grid             quantity, remove
```

- **The shell owns shared state.** The search text and the cart contents live in `shell/src/App.tsx`. The remotes receive them as props and report changes through callback props (`addToCart`, `onQuantityChange`, `onRemove`). The remotes never talk to each other.
- **Remotes are loaded at runtime.** The shell imports `products/ProductApp` and `cart/CartApp` lazily; the URLs of their `remoteEntry.js` files are set in `shell/vite.config.ts`. React and React DOM are shared as singletons so only one copy runs.
- **Types are shared, code is not.** `shared/types.ts` defines `Product` and `CartItem`. Apps import them with `import type`, which is removed at build time, so no app bundles another app's code.
- **Remote prop types are written by hand** in `shell/src/declarations.d.ts`. When a remote's props change, update that file as well.

## Project structure

```
shell/      host app: Header, routes, cart state
products/   remote: ProductApp, ProductCard
cart/       remote: CartApp, CartList
shared/     TypeScript types used by all three apps
```

## Known limits

- Search only covers the first 30 products the API returns, not the full catalogue.
- The cart is kept in memory and empties when the page reloads.
- Checkout is a button with no behaviour behind it.
- There are no automated tests.
- Remote URLs are hard-coded to `localhost`, so the project is set up for local development only.
