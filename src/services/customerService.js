import http from "./httpService";

const apiEndpoint = "/customers";

export async function getCustomers() {
  const { data } = await http.get(apiEndpoint);
  return data;
}

export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete customer._id;
    return await http.put(apiEndpoint + "/" + customer._id, body);
  }

  return await http.post(apiEndpoint, customer);
}
