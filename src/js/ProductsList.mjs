import { getData } from "./Data.mjs";

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
      let imageURL = await this.getProductImage(product.imageQuery);

      return this.productCardTemplate(product, imageURL);
    });
    let resolvedProductCards = await Promise.all(productCards);
    cardContainer.innerHTML = resolvedProductCards.join("");
  }

  productCardTemplate(product, imageURL) {
    const card = `
                <article class="products-card">
                    <img src="${imageURL}" alt="${product.name}" class="product-image" load="lazy" >
                    <p class="product-name">${product.name}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="action-buttons" type="button" aria-label="Decrease quantity">-</button>
                    <span class="product-quantity">0</span>
                    <button class="action-buttons" type="button" aria-label="Increase quantity">+</button>
                </article>
        `;
    return card;
  }

  async getProductImage(imageQuery) {
    const pixabayKey = import.meta.env.VITE_PIXABAY_API_KEY;
    const pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${imageQuery}&category=food&image_type=photo`;
    const response = await fetch(pixabayUrl);
    const imageData = await response.json();

    if (imageData.hits.length === 0) {
      if (imageQuery === "pupusa") {
        return "/images/businesses/pupusas-product.webp";
      }
      return "";
    }
    return imageData.hits[0].webformatURL;
  }
}
