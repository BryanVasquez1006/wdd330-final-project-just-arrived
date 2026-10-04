export default function displayBusinesses(data) {
  const businessesGrid = document.querySelector(".business-grid");
  const card = data.businesses.map((business) => {
    const businessesTemplate = `
              <article class="business-card">
                <img src="${business.image}" alt="${business.name}" class="biz-images">
              </article>
        `;
    return businessesTemplate;
  });
  businessesGrid.innerHTML = card.join("");
}
