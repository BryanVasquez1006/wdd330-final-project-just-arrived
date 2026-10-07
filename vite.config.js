import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "/index.html",
        productList: "/product-list/index.html",
      },
    },
  },
});
