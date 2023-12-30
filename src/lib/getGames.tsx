import queryString from 'query-string';

export default async function getGames(queryParams) {
  const apiKey = process.env.GIANT_BOMB_API_KEY;
  const baseUrl = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&limit=20`;
  const url = !queryParams ? baseUrl : baseUrl.concat("&", queryString.stringify(queryParams));
  const res = await fetch(url, { next: { revalidate: 300 }, });
  if (!res.ok) {
    throw new Error(`HTTP error: status ${res.status}`)
  }
  const parsedRes = await res.json();
  return parsedRes
}
