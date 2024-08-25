import axios from "axios";
import BASE_URL from "./urls";

export const register = (username, email, password) => {
  return axios.post(`${BASE_URL}users/`, { username, email, password });
};

export const login = (username, password) => {
  return axios.post(`${BASE_URL}api-token-auth/`, { username, password });
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
