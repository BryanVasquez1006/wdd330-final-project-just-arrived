import displayHeader from "./Header.mjs";
import displayFooter from "./Footer.mjs";
import "../style.css";
import { displayOrderSummaryAside, getCartBusiness } from "./Cart.mjs";
import { displayDeliveryDetails, displaySelectedAddress } from "./Checkout.mjs";
import { initializeMap, drawRoute, fitRouteBounds } from "./Map.mjs";
import { getAddress } from "./Geocoding.mjs";

displayHeader();
displayFooter();
displayOrderSummaryAside();

// Get the business associated with the cart
const business = getCartBusiness();

// Only initialize the map if the business has valid coordinates
if (
  Array.isArray(business?.coordinates) &&
  business.coordinates.length === 2 &&
  business.coordinates.every(Number.isFinite)
) {
  const origin = business.coordinates;

  const map = initializeMap(async (destination) => {
    // Get route, distance, and delivery fee
    const deliveryData = await displayDeliveryDetails(origin, destination);

    if (deliveryData) {
      const { geometry, deliveryFee } = deliveryData;

      // Update order summary with delivery fee
      displayOrderSummaryAside(deliveryFee);

      console.log("Delivery fee received:", deliveryFee);

      // Draw the route and adjust the map view
      const updateMap = () => {
        drawRoute(map, geometry);
        fitRouteBounds(map, geometry);
      };

      if (map.isStyleLoaded()) {
        updateMap();
      } else {
        map.once("load", updateMap);
      }
    }

    // Get the address of the selected destination
    try {
      const addressData = await getAddress(destination);

      const address =
        addressData.features?.[0]?.properties?.full_address ??
        "Address not available";

      displaySelectedAddress(address);

      console.log("Selected Address:", address);
    } catch (error) {
      console.error("Error getting address:", error);
      displaySelectedAddress("Address not available");
    }
  }, origin);
} else {
  console.error("Business or coordinates not available");
}
