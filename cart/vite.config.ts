import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: { port: 3004, origin: "http://localhost:3004" },
  preview: { port: 3004 },
  plugins: [
    react(),
    federation({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./CartApp": "./src/CartApp.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
      // ponytail: no cross-app type sharing; shell uses a `declare module` stub.
      // To enable: dts: { tsConfigPath: "./tsconfig.app.json" } here, plus paths in shell.
      dts: false,
      dev: { remoteHmr: true },
    }),
  ],
  build: {
    target: "esnext",
  },
});
