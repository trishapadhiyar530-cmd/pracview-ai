import axios from "axios";
import API from "./api";
const API = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const signupUser = async (userData) => {
  const response = API.post("/auth/signup", UserData);
  return response.data;
};
export const loginUser = async (loginData) => {
  const response = API.post("auth/login", loginData);
  return response.data;
};
export const getProfile = async (email) => {
  const response = await axios.get(
    `/ai/profile?email=${email}`
  );

  return response.data;
};