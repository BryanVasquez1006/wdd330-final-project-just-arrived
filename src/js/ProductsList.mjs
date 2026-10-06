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
         console.log(productsData)
    }

    async renderProducts() {
        const businessesPath = "businesses.json";
        const data = await getData(businessesPath);
        const businessNameTitle = document.querySelector(".business-name");
        const business = data.businesses.find((business) => {
            return business.id === this.businessId
        })

        console.log(business);
        businessNameTitle.textContent = `${business.name} Products`


        const cardContainer = document.querySelector(".products-list-grid");



    

        const productCards = this.filteredProducts.map((product) => {
            return this.productCardTemplate(product);
        });
        cardContainer.innerHTML = productCards.join("");
    }

    productCardTemplate(product) {
        const card = `
                <article class="products-card">
                    <img src="" alt="" class="product-image">
                    <p>${product.name}</p>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="action-buttons" type="button" aria-label="Decrease quantity">-</button>
                    <span class="product-quantity">0</span>
                    <button class="action-buttons" type="button" aria-label="Increase quantity">+</button>
                </article>
        `;
        return card;
    }
}