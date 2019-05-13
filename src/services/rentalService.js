import http from "./httpService";

const apiEndpoint = "/rentals";

export async function createRental(rental) {
  console.log(rental);
  http.post(apiEndpoint, rental);
}

export async function getRentals() {
  const { data } = await http.get(apiEndpoint);

  return data;
}
