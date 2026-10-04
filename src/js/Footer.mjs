export default function  displayFooter () {
    const footerElement = document.querySelector("footer");

    const footerTemplate = `
     
      <div class="footer-content">
        <div class="footer-brand">
          <img src="/images/just-arrive-logo.png" alt="JustArrived! logo" />
          <h2>JustArrived!</h2>
          <p>Local favorites, delivered fast.</p>
        </div>

        <nav class="footer-navigation" aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="#businesses">Businesses</a>
          <a href="/cart/">Cart</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-disclaimer">
          This website is an academic project. Product information and prices
          may be simulated.
        </p>

        <div class="footer-copyright">
          <p>&copy; 2026 JustArrived!</p>
          <p>WDD 330 Final Project</p>
        </div>
      </div>`;

    footerElement.innerHTML = footerTemplate;
      
}