import axios from "axios";
import { toast } from "react-toastify";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

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

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};
