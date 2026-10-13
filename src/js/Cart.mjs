import { getLocalStorage, setLocalStorage } from "./Utils.mjs";
import { getData } from "./Data.mjs";
import { getProductImage } from "./Images.mjs";

const CART_KEY = "ja-cart";
const productsData = await getData("products.json");
const businessData = await getData("businesses.json");

//Function to add products to the cart
export function addProductsToCart() {
  const increaseBtns = document.querySelectorAll(".increase-btn");
  increaseBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const cart = getLocalStorage(CART_KEY) ?? [];
      const productId = button.dataset.productId;

      //finding the product ID in the cart from LocalStorage and matching it with the dataset ID

      const selectedProduct = cart.find((item) => {
        return item.productId === Number(productId);
      });

      //adding 1 to the "quantity" attribute
      if (selectedProduct) {
        selectedProduct.quantity++;
        setLocalStorage(CART_KEY, cart);

        //updating the quantity counter in each card
        const counterContainer = button.closest(".cart-btns-container");
        const quantityElement =
          counterContainer.querySelector(".product-quantity");

        quantityElement.textContent = selectedProduct.quantity;
      } else {
        //Creating an object for the new product if it doesn't exist
        const counterContainer = button.closest(".cart-btns-container");
        const quantityElement =
          counterContainer.querySelector(".product-quantity");

        const newProduct = {
          productId: Number(productId),
          quantity: 1,
        };
        cart.push(newProduct);
        setLocalStorage(CART_KEY, cart);
        quantityElement.textContent = newProduct.quantity;
      }
      //updating prices dinamically in the side section after the button is clicked
      displayOrderSummaryAside();
      console.log("SelectedProducts: ", selectedProduct);
    });
  });
}

export function removeProductsFromCart() {
  const decreaseBtns = document.querySelectorAll(".decrease-btn");
  decreaseBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const cart = getLocalStorage(CART_KEY) ?? [];
      const productId = button.dataset.productId;

      const selectedProduct = cart.find((item) => {
        return item.productId === Number(productId);
      });

      //substracting 1 to the "quantity" attribute in the cart
      if (selectedProduct && selectedProduct.quantity > 1) {
        selectedProduct.quantity--;
        setLocalStorage(CART_KEY, cart);
        displayOrderSummaryAside();

        //Updating the quantity counter
        const counterContainer = button.closest(".cart-btns-container");
        const quantityElement =
          counterContainer.querySelector(".product-quantity");

        quantityElement.textContent = selectedProduct.quantity;
      }
    });
  });
}

export function deleteCartProduct() {
  const deleteBtn = document.querySelectorAll(".delete-product");

  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const cart = getLocalStorage(CART_KEY) ?? [];
      const productId = button.dataset.productId;
      //keeping the products that are not the ones the user selected for removal:
      const updatedCart = cart.filter((item) => {
        return item.productId !== Number(productId);
      });
      //updating cart
      setLocalStorage(CART_KEY, updatedCart);
      displayOrderSummaryAside();

      //removing card from DOM
      const productCard = button.closest(".cart-card-container");
      productCard.remove();
    });
  });
}
export async function displayCartProductCards() {
  const cartProductsContainer = document.querySelector(
    ".cart-products-container",
  );
  const cart = getLocalStorage(CART_KEY) ?? [];
  console.log(cart);

  //Linking the product ID from localstorage to product ID from products.json
  const cardTemplate = cart.map(async (product) => {
    const productDetails = productsData.products.find((item) => {
      return item.id === product.productId;
    });

    console.log("Image query:", productDetails.imageQuery);

    //Obtaining the image URL

    const imageURL = await getProductImage(productDetails.imageQuery);

    const businessDetails = businessData.businesses.find((business) => {
      return business.id === productDetails.businessId;
    });
    //linking the business ID from businesses.json to products.json

    console.log("business details already linked: ", businessDetails);
    console.log("products details: ", productDetails);
    return `
            <article class="cart-card-container">
              <div>
                <img
                  src="${imageURL}"
                  alt="Pupusas"
                  class="cart-product-image"
                  loading="lazy"
                  width="900"
                  height="500"
                />
              </div>
              <div class="cart-product-info">
                <p>${productDetails.name}</p>
                <p class="cart-biz-name">${businessDetails.name}</p>
                <p class="cart-product-price">$${productDetails.price.toFixed(2)}</p>
    
                <div class="counter-delete-container">
                  <div class="cart-btns-container">
                    <button
                      class="action-buttons decrease-btn"
                      type="button"
                      aria-label="Decrease quantity"
                      data-product-id = "${product.productId}"
                    >
                      -
                    </button>
    
                    <span class="product-quantity">${product.quantity}</span>
    
                    <button
                      class="action-buttons increase-btn"
                      type="button"
                      aria-label="Increase quantity"
                      data-product-id = "${product.productId}"
                    >
                      +
                    </button>
                  </div>
    
                  <button
                    class="delete-product"
                    type="button"
                    aria-label="Remove product from cart"
                    data-product-id="${product.productId}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
            `;
  });
  const resolvedCards = await Promise.all(cardTemplate);
  cartProductsContainer.innerHTML = resolvedCards.join("");
}

export function displayOrderSummaryAside() {
  const asideElement = document.querySelector(".order-summary");
  if (!asideElement) return;
  const subtotal = calculateSubtotal();
  const cart = getLocalStorage(CART_KEY) ?? [];

  const totalItems = cart.reduce((accTotal, item) => {
    return accTotal + item.quantity;
  }, 0);

  console.log("subtotal: ", subtotal);
  const asideTemplate = `
          <h2>Order Summary</h2>
          <span class="summary-divider"></span>
          <div class="price-section">
            <p>Items:</p>
            <p class="cart-price">${totalItems}</p>
          </div>
          <div class="price-section">     
            <p>Delivery</p>
            <p class="cart-price">$1.23</p>
          </div>
          <span class="summary-divider"></span>
          <div class="price-section"> 
          <p class="cart-total">Subtotal</p>
          <p class="cart-price">$${subtotal.toFixed(2)}</p>
          </div>
           <div class="price-section"> 
           <p class="cart-total">Total</p>
           <p class="cart-price">$1.23</p>
          </div>
          <p class="cart-final-price">$3.50</p>
          <a class="default-button" href="/checkout-page">Proceed to checkout</a>
    `;
  asideElement.innerHTML = asideTemplate;
}

export function calculateSubtotal() {
  const cart = getLocalStorage(CART_KEY) ?? [];

  const subtotal = cart.reduce((accPrice, product) => {
    //linking the id from the products to the local storage products
    const productDetails = productsData.products.find((item) => {
      return item.id === product.productId;
    });
    return accPrice + productDetails.price * product.quantity;
  }, 0);
  return subtotal;
}

/* export function showMiniCartItemsTotal() {
  const cart = getLocalStorage(CART_KEY) ?? [];
  const totalItems = cart.reduce((accItems, item) => {});
} */
