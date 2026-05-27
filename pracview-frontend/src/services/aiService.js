import axios from "axios";
import API from "./api";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/ai`;

export const askAI = async (message) => {
  const response = await axios.post(`${API}/chat`, {
    message,
  });

  return response.data;
};
export const generateMockInterview = async (data) => {
  const response = await axios.post(
    "/ai/mock-interview",
    data
  );

  return response.data;
};
export const evaluateInterview = async (data) => {
  const response = await axios.post(
    "/ai/evaluate-interview",
    data
  );

  return response.data;
};

export const analyzeResume = async (file, userEmail) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("userEmail", userEmail);

  const response = await axios.post(
    "/ai/analyze-resume",
    formData
  );

  return response.data;
};
export const generateQuiz = async (data) => {
  const response = await axios.post(
    "/ai/generate-quiz",
    data
  );

  return response.data;
};
export const getHistory = async (userEmail) => {
  const response = await axios.get(
    `/ai/history?userEmail=${userEmail}`
  );

  return response.data;
};
export const getAnalytics = async (userEmail) => {
  const response = await axios.get(
    `/ai/analytics?userEmail=${userEmail}`
  );

  return response.data;
};