export async function getAddress(coordinates) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;

  const [longitude, latitude] = coordinates;

  const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${token}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }

  // Convert the response into a JavaScript object
  const data = await response.json();

  return data;
}
