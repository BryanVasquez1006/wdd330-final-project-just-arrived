import "../style.css";
import displayFooter from "./Footer.mjs";
import displayHeader from "./Header.mjs";
import test from "./Utils.mjs";
import { addProductsToCart, removeProductsFromCart, displayCartProductCards, deleteCartProduct } from "./Cart.mjs";


displayHeader();
displayFooter();
displayCartProductCards();
addProductsToCart();
removeProductsFromCart();
deleteCartProduct();








