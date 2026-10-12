export default function displayHeader() {
  const navElement = document.querySelector("#navigation");

  navElement.innerHTML = `
    <div class="logo-container">
        <a href="../index.html">
          <img
          src="/images/businesses/just-arrive-logo.webp"
          alt="business logo"
          id="biz-logo"
          width="500"
          height="333"
          />
          <p class="logo-text">Just Arrived!</p>
        </a>

      
    </div>
    <a href="../cart-page/index.html">
    <div class="cart-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="white"
          class="bi bi-cart-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
          />
        </svg>
        <span class="cart-count">0</span>
        
      </div>

    </a>
    `;
}
