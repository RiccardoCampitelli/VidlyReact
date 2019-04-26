import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/genres";

export async function getGenres() {
  const { data } = await http.get(apiEndpoint);
  return data;
}
