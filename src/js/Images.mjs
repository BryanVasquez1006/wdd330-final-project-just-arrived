export async function getProductImage(imageQuery) {
  const pixabayKey = import.meta.env.VITE_PIXABAY_API_KEY;
  const pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(imageQuery)}&category=food&image_type=photo`;
  const response = await fetch(pixabayUrl);
  const imageData = await response.json();

  if (imageData.hits.length === 0) {
    if (imageQuery === "pupusa") {
      return "/images/businesses/pupusas-product.webp";
    }
    return "";
  }
  return imageData.hits[0].webformatURL;
}
