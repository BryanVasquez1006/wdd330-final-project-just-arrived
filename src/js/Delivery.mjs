export function calculateDeliveryFee(distanceKm) {
  //For displaying purposes, the delivery fee is calculated with a base fee of $1 and an additional $0.30 per km.
  const baseFee = 1;
  const pricePerKm = 0.3;
  const includeKm = 1;

  const extraKm = Math.max(0, distanceKm - includeKm);
  const deliveryFee = baseFee + extraKm * pricePerKm;

  return Number(deliveryFee.toFixed(2));
}
