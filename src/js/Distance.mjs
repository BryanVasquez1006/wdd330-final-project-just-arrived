export async function getRoute(origin, destination) {
  const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const coordinates = `${origin.join(",")};${destination.join(",")}`;

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?overview=full&geometries=geojson&access_token=${mapBoxToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Directions request failed: ${response.status}`);
  }
  const data = await response.json();

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error(data.message || "No driving rout found");
  }

  return data.routes[0];
}
