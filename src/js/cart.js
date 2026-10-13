import "../style.css";
import displayFooter from "./Footer.mjs";
import displayHeader from "./Header.mjs";
import {
  addProductsToCart,
  removeProductsFromCart,
  displayCartProductCards,
  deleteCartProduct,
  displayOrderSummaryAside,
} from "./Cart.mjs";

displayHeader();
displayFooter();
displayOrderSummaryAside();
await displayCartProductCards();
addProductsToCart();
removeProductsFromCart();
deleteCartProduct();
