import http from "./httpService";

const apiEndpoint = "/rentals";

export async function createRental(rental) {
  return await http.post(apiEndpoint, rental);
}

export async function getRentals() {
  const { data } = await http.get(apiEndpoint);

  return data;
}

export async function returnRental(rental) {
  const res = await http.post("/returns", rental);
  console.log(res);
}
