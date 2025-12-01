// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      cesium: resolve(__dirname, "node_modules/cesium"),
      "mersenne-twister": resolve(__dirname, "src/utils/mersenne-twister-proxy.js"),
      "grapheme-splitter": resolve(__dirname, "src/utils/grapheme-splitter-proxy.js"),
      "bitmap-sdf": resolve(__dirname, "src/utils/bitmap-sdf-proxy.js"),
      lerc: resolve(__dirname, "src/utils/lerc-proxy.js"),
      "nosleep.js": resolve(__dirname, "src/utils/nosleep-proxy.js"),
    },
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify("/cesium"),
  },
  optimizeDeps: {
    exclude: ["cesium"],
    include: ["urijs", "mersenne-twister", "bitmap-sdf", "grapheme-splitter", "lerc", "nosleep.js"],
  },
  build: {
    rollupOptions: {
      // bisa ditambah pengaturan khusus kalau nanti perlu
    },
  },
});
