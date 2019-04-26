import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/movies";

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
    await http.put(apiEndpoint + "/" + movie._id, body);
  }

  return http.post(apiEndpoint, movie);
}
