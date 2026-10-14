import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "/index.html",
        productList: "/product-list/index.html",
        cartPage: "/cart-page/index.html",
        checkout: "/checkout-page/index.html",
      },
    },
  },
});
