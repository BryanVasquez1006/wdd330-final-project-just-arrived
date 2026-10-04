export async function getData(pathUrl) {
  const response = await fetch(`/data/${pathUrl}`);
  if (!response.ok) {
    throw new Error(`Oops, something went wrong. Status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
