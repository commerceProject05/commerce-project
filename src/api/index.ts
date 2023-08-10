export async function getDetail(id: number) {
  const response = await fetch("/data.json");
  const data = (await response.json()) as Listing[];

  return data.find((data: Listing) => data.id === id);
}
