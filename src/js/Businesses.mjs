export default function displayBusinesses(data) {
  const businessesGrid = document.querySelector(".business-grid");
  const card = data.businesses.map((business) => {
    const businessesTemplate = `
              <a href="/product-list/?business=${business.id}">
                <article class="business-card">
                    <img src="${business.image}" alt="${business.name}" class="biz-images" width="800" height="800">
                </article>
              </a>
        `;
    return businessesTemplate;
  });
  businessesGrid.innerHTML = card.join("");
}
