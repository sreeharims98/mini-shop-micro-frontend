import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        products: {
          type: "module",
          name: "products",
          entry: "http://localhost:3001/remoteEntry.js",
        },
        cart: {
          type: "module",
          name: "cart",
          entry: "http://localhost:3004/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
      dts: false,
      dev: { remoteHmr: true },
    }),
  ],
  build: {
    target: "esnext",
  },
});
