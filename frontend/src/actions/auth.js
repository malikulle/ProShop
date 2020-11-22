import api from "../api/api";

import axios from "axios";

export const setAuthorizationHeader = ({ token }) => {
  if (token) {
    const value = `Bearer ${token}`;
    axios.defaults.headers["Authorization"] = value;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const setBaseuRL = () => (axios.defaults.baseURL = api.baseUrl);
