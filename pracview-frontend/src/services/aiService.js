import axios from "axios";

const API = "http://localhost:8081/api/ai";

export const askAI = async (message) => {
  const response = await axios.post(`${API}/chat`, {
    message,
  });

  return response.data;
};
export const generateMockInterview = async (data) => {
  const response = await axios.post(
    "http://localhost:8081/api/ai/mock-interview",
    data
  );

  return response.data;
};
export const evaluateInterview = async (data) => {
  const response = await axios.post(
    "http://localhost:8081/api/ai/evaluate-interview",
    data
  );

  return response.data;
};

export const analyzeResume = async (file, userEmail) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("userEmail", userEmail);

  const response = await axios.post(
    "http://localhost:8081/api/ai/analyze-resume",
    formData
  );

  return response.data;
};
export const generateQuiz = async (data) => {
  const response = await axios.post(
    "http://localhost:8081/api/ai/generate-quiz",
    data
  );

  return response.data;
};
export const getHistory = async (userEmail) => {
  const response = await axios.get(
    `http://localhost:8081/api/ai/history?userEmail=${userEmail}`
  );

  return response.data;
};
export const getAnalytics = async (userEmail) => {
  const response = await axios.get(
    `http://localhost:8081/api/ai/analytics?userEmail=${userEmail}`
  );

  return response.data;
};