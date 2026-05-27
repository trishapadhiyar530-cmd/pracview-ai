import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const API = `${API_BASE}/api/auth`;

export const signupUser = async (userData) => {
  const response = await axios.post(`${API}/signup`, userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API}/login`, loginData);
  return response.data;
};