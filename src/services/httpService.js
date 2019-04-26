import axios from "axios";

axios.interceptors.response.use(null, err => {
  console.log(err); // requests work but i keep getting error messages
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};
