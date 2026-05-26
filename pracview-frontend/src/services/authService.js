import axios from "axios";

const API = "http://localhost:8081/api/auth";

export const signupUser = async (userData) => {
  const response = await axios.post(`${API}/signup`, userData);
  return response.data;
};
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API}/login`, loginData);
  return response.data;
};
export const getProfile = async (email) => {
  const response = await axios.get(
    `http://localhost:8081/api/ai/profile?email=${email}`
  );

  return response.data;
};