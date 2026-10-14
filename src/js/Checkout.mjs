import { getRoute } from "./Distance.mjs";
import { calculateDeliveryFee } from "./Delivery.mjs";

export async function displayDeliveryDetails(origin, destination) {
  const deliveryDetsContainer = document.querySelector(".delivery-details");

  try {
    const route = await getRoute(origin, destination);
    const distanceKm = route.distance / 1000;
    const deliveryFee = calculateDeliveryFee(distanceKm);

    const deliveryDetailsTemplate = `
           <div class="distance-info">
              <p>Distance</p>
              <p>${route.distance > 0 ? (route.distance / 1000).toFixed(2) : "—"} km</p>
              </div>
              <div class="arrival-info">
              <p>Estimated arrival</p>
              <p> ${route.duration > 0 ? Math.ceil(route.duration / 60) : "—"} min</p>
          </div>
      `;

    deliveryDetsContainer.innerHTML = deliveryDetailsTemplate;
    return {
      geometry: route.geometry,
      deliveryFee: deliveryFee,
    };
  } catch (error) {
    console.error("Error getting route:", error);
  }
}

export function displaySelectedAddress(address) {
  const addresstext = document.querySelector(".address-text");
  addresstext.textContent = address;
}
