import http from "./httpService";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/movies";

export async function getMovies() {
  const { data } = await http.get(apiEndpoint);
  return data;
}

export async function getMovie(id) {
  const { data } = await http.get(apiEndpoint + "/" + id);
  return data;
}

export async function deleteMovie(id) {
  const { data } = await http.delete(apiEndpoint + "/" + id);
  return data;
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(apiEndpoint + "/" + movie._id, body);
  }

  return await http.post(apiEndpoint, movie);
}
