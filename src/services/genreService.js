import http from "./httpService";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/genres";

export async function getGenres() {
  const { data } = await http.get(apiEndpoint);
  return data;
}
