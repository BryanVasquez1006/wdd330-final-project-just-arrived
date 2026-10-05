import "../style.css";
import displayFooter from "./Footer.mjs";
import displayHeader from "./Header.mjs";
import { getData } from "./Data.mjs";

displayFooter();
displayHeader();

const params = new URLSearchParams(window.location.search);
const businessId = Number(params.get("business"));

const urlPath = "products.json";
const productsData = await getData(urlPath);

//Filtering products that only match with the business Id selected
const filteredProducts = productsData.products.filter((product) => {
  return product.businessId === businessId;
});
