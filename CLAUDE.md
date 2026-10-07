# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Mini Shop": a micro-frontend demo built with React 19, Vite 8 and `@module-federation/vite`. Three independent apps live side by side, each with its own `package.json`, `node_modules` and lockfile. The root `package.json` is orchestration only (not a workspace): it must never hold app dependencies, and each app must keep working on its own.

| App | Role | Port | Exposes |
|---|---|---|---|
| `shell/` | Host: header, routing, cart state | 3000 | nothing |
| `products/` | Remote: product grid | 3001 | `./ProductApp` |
| `cart/` | Remote: cart page | 3004 | `./CartApp` |

## Commands

From the repo root, for all three apps: `npm run install:all`, `npm run dev` (uses `concurrently`), `npm run lint`, `npm run typecheck`, `npm run build`.

Or inside `shell/`, `products/` or `cart/`:

```
npm install
npm run dev       # Vite dev server on the app's fixed port
npm run lint      # oxlint
npx tsc -b        # typecheck
npm run build
```

- All three dev servers must be running for the shell to work; it loads `http://localhost:3001/remoteEntry.js` and `http://localhost:3004/remoteEntry.js` (hard-coded in `shell/vite.config.ts`).
- Only `shell`'s `build` script runs `tsc`. In `products` and `cart`, `npm run build` does not typecheck, so run `npx tsc -b` there explicitly.
- There are no tests and no test runner.
- Each remote also runs standalone on its own port through its `src/App.tsx` + `src/main.tsx`.

## Architecture

**Shell owns all cross-app state and passes it to remotes as props.** Remotes never talk to each other. `shell/src/App.tsx` holds the search query and the cart items, and defines `addToCart`, `setQuantity` and `removeFromCart`.

- `ProductApp` receives `query`, `cartIds` and `addToCart`. It fetches `https://dummyjson.com/products` itself and filters the fetched 30 products client-side by `query`.
- `CartApp` receives `products` (the cart items), `onQuantityChange` and `onRemove`. It keeps no state of its own.
- Every remote prop is optional so the remote still renders standalone. Keep it that way when adding props.

**Routing** is `react-router` in the shell only: `/cart` renders `CartApp`, every other path renders `ProductApp`. Typing in the header search while on `/cart` navigates back to `/`.

**Shared types** live in `shared/types.ts` (`Product`, and `CartItem = Product & { quantity }`). Each app's `tsconfig.app.json` includes `../shared`. Import them with `import type` only: the import is erased at build, so no app bundles another app's code and Vite needs no alias.

**Remote prop types are hand-written** in `shell/src/declarations.d.ts`, because federation type generation is off (`dts: false` in every `vite.config.ts`). When a remote's props change, update that file too or the shell will not catch the mismatch. Relative `import` statements are not allowed inside its `declare module` blocks; use the `import("../../shared/types").X` type form.

**Adding a remote** touches four places: the new app's `vite.config.ts` (`name`, `exposes`, port), `remotes` in `shell/vite.config.ts`, a `declare module` in `shell/src/declarations.d.ts`, and a `lazy(() => import(...))` plus route in `shell/src/App.tsx`. `react` and `react-dom` are shared as singletons in every federation config.

## Styling

- CSS Modules, one stylesheet per component, no CSS framework. Exception: `cart/src/CartList.tsx` imports `CartApp.module.css` because the total row reuses the same name and price styles.
- Colour tokens (`--ink`, `--muted`, `--rule`, `--ticket`, `--focus`) are declared on each app's root class (`.page` in shell, `.shelf` in the remotes) and duplicated across apps on purpose, so each remote looks right standalone. Change a token in all three.
- Global `body` styles for a remote's standalone page go in that remote's `index.html`, not in an exposed module, so they do not leak into the shell.

## Gotchas

- oxlint's `react/only-export-components` warns when a `.tsx` file exports non-components. Put hooks and helpers in a separate `.ts` file.
- After deleting or renaming a source file, a running Vite dev server can keep requesting the old path and serve a blank page. Restart that dev server.
- Comments starting with `ponytail:` mark deliberate shortcuts and name the upgrade path (for example, search only covers the 30 fetched products).
