import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function initializeMap(onLocationSelected, origin) {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: origin,
    zoom: 12,
  });

   const businessMarker = new mapboxgl.Marker({
    color: "#ff0000",
  })
    .setLngLat(origin)
    .addTo(map);

  const destinationMarker = new mapboxgl.Marker({
    color: "#ff8200",
  });

  //capturing user coordinates when they click on  the map
  map.on("click", (event) => {
    //storing the coordinates where the user clicked
    const destination = [event.lngLat.lng, event.lngLat.lat];
    destinationMarker.setLngLat(destination).addTo(map);
    onLocationSelected(destination);
  });
  return map;
}

export function drawRoute(map, geometry) {
  const routeData = {
    type: "Feature",
    geometry: geometry,
    properties: {},
  };

  if (map.getSource("delivery-route")) {
    map.getSource("delivery-route").setData(routeData);
    return;
  }
  map.addSource("delivery-route", {
    type: "geojson",
    data: routeData,
  });

  map.addLayer({
    id: "delivery-route-line",
    type: "line",
    source: "delivery-route",
    paint: {
      "line-color": "#000000",
      "line-width": 5,
    },
  });
}

export function fitRouteBounds(map, geometry) {
  const bounds = new mapboxgl.LngLatBounds();

  geometry.coordinates.forEach((coordinate) => {
    bounds.extend(coordinate);
  });

  map.fitBounds(bounds, {
    padding: 60,
    maxZoom: 15,
    duration: 1000,
  });
}
