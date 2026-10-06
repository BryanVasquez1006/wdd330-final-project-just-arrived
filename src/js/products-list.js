import "../style.css";
import displayFooter from "./Footer.mjs";
import displayHeader from "./Header.mjs";
import ProductList from "./ProductsList.mjs";


displayFooter();
displayHeader();

//Getting business ID number in the URL
const params = new URLSearchParams(window.location.search);
const businessId = Number(params.get("business"));
const productList = new ProductList(businessId);
await productList.init();
productList.renderProducts();





/* 
const product = filteredProducts[0];
console.log(product);
const imageQuery = "beans";
const pixabayUrl = `https://pixabay.com/api/?key=57899719-8c1c8d57c33aab798b69aa9ae&q=beans&category=food&image_type=photo`; */

/* const response = await fetch(pixabayUrl);
const imageData = await response.json(); */
/* console.log(imageData)
console.log(imageData.hits[0].webformatURL)
console.log(pixabayUrl) */
/* const imageURL = imageData.hits[0].webformatURL;
 *//* console.log(imageURL); */

/* const productImage = document.querySelector(".product-image");
productImage.src = imageURL; */

/* console.log("IMAGE ELEMENT:", productImage);
console.log("IMAGE URL:", imageURL); */

/* productImage.src = imageURL;
 */
/* console.log("SRC AFTER:", productImage.src); */