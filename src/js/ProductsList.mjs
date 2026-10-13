import { getData } from "./Data.mjs";
import { addProductsToCart, removeProductsFromCart } from "./Cart.mjs";
import { getLocalStorage } from "./Utils.mjs";
import { getProductImage } from "./Images.mjs";

export default class ProductList {
  constructor(businessId) {
    this.businessId = businessId;
  }
  async init() {
    const urlPath = "products.json";
    const productsData = await getData(urlPath);

    //Filtering products that only match with the business Id selected
    this.filteredProducts = productsData.products.filter((product) => {
      return product.businessId === this.businessId;
    });
  }

  async renderProducts() {
    const businessesPath = "businesses.json";
    const data = await getData(businessesPath);
    const businessNameTitle = document.querySelector(".business-name");
    const business = data.businesses.find((business) => {
      return business.id === this.businessId;
    });

    businessNameTitle.textContent = `${business.name} Products`;

    const cardContainer = document.querySelector(".products-list-grid");

    //displaying the information of every card based in the filtered data for each business
    const productCards = this.filteredProducts.map(async (product) => {
      let imageURL = await getProductImage(product.imageQuery);

      return this.productCardTemplate(product, imageURL);
    });
    let resolvedProductCards = await Promise.all(productCards);
    cardContainer.innerHTML = resolvedProductCards.join("");

    addProductsToCart();
    removeProductsFromCart();
  }

  productCardTemplate(product, imageURL) {
    //retrieving cart
    const cart = getLocalStorage("ja-cart") ?? [];

    //finding product being selected
    const selectedProduct = cart.find((item) => {
      return item.productId === product.id;
    });

    const quantity = selectedProduct?.quantity ?? 0;
    console.log("Cart from localStorage:", cart);
    console.log("Selected product:", selectedProduct);
    console.log("Quantity to display:", quantity);

    console.log("Rendering product:", product.id);
    console.log("Stored quantity:", quantity);
    const card = `
                <article class="products-card">
                    <img src="${imageURL}" alt="${product.name}" class="product-image" load="lazy" >
                    <p class="product-name">${product.name}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="cart-btns-container">
                      <button class="action-buttons decrease-btn" type="button" aria-label="Decrease quantity" data-product-id="${product.id}">-</button>
                      <span class="product-quantity">${quantity}</span>
                      <button class="action-buttons increase-btn" data-product-id="${product.id}" type="button" aria-label="Increase quantity">+</button>          
                    </div>
                </article>
        `;
    return card;
  }
}
