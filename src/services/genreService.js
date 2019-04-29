import http from "./httpService";

const apiEndpoint = "/genres";

export async function getGenres() {
  const { data } = await http.get(apiEndpoint);
  return data;
}
