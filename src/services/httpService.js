import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const expectedError = err.request.status >= 400 && err.request.status < 500;
    console.log(err.response);
    if (!expectedError) {
      console.log(err.request, expectedError);
      toast.error("Unexpected error");
    }

    return Promise.reject(err.request);
  }
);

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt
};
