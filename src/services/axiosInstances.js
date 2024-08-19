import axios from "axios";

// const BASE_URL = process.env.BASE_URL;
const BASE_URL ="http://127.0.0.1:8000/"

const baseInstance = () => {
  const API_URL = process.env.BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers,
  });
};

const authInstance = () => {
  const API_URL = process.env.BASE_URL;
  const authToken = sessionStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Token ${authToken}` };
  }
  return axios.create({
    baseURL: BASE_URL,
    timeout: 25000,
    headers,
  });
};

const MauthInstance = () => {
  const API_URL = process.env.BASE_URL;
  const authToken = sessionStorage.getItem("token");
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Token ${authToken}` };
  }
  return axios.create({
    baseURL: BASE_URL,
    timeout: 25000,
    headers,
  });
};

export default { baseInstance, authInstance, MauthInstance };
