import http from "./httpService";

const apiEndpoint = "/customers";

export async function getCustomers() {
  const { data } = await http.get(apiEndpoint);
  return data;
}
