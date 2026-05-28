import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const API = `${API_BASE}/api/ai`;

export const askAI = async (message) => {
  const response = await axios.post(`${API}/chat`, {
    message,
  });

  return response.data;
};

export const generateMockInterview = async (data) => {
  const response = await axios.post(
    `${API}/mock-interview`,
    data
  );

  return response.data;
};

export const evaluateInterview = async (data) => {
  const response = await axios.post(
    `${API}/evaluate-interview`,
    data
  );

  return response.data;
};

export const analyzeResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API}/analyze-resume`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const generateQuiz = async (data) => {
  const response = await axios.post(
    `${API}/generate-quiz`,
    data
  );

  return response.data;
};

export const getHistory = async (userEmail) => {
  const response = await axios.get(
    `${API}/history?userEmail=${userEmail}`
  );

  return response.data;
};

export const getAnalytics = async (userEmail) => {
  const response = await axios.get(
    `${API}/analytics?userEmail=${userEmail}`
  );

  return response.data;
};