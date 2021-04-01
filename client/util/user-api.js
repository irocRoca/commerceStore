import axios from "./axiosInstance";

export function signUp(userData) {
  axios
    .post("/signup", userData)
    .then((res) => res.data)
    .catch((err) => console.log("Error sending api to server"));
}
