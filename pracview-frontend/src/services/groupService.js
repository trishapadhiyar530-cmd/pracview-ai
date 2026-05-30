import axios from "axios";

const API =
  `${import.meta.env.VITE_API_BASE_URL}/api/group`

export const createRoom = async (email) => {
  console.log("Creating room...");
  console.log(API);
  console.log(email);

  const response = await axios.post(
    `${API}/create`,
    {
      email
    }
  );

  return response.data;
};
export const joinRoom = async (
  roomCode,
  email
) => {

  const response = await axios.post(
    `${API}/join`,
    {
      roomCode,
      email,
    }
  );

  return response.data;
};

export const getRoom = async (
  roomCode
) => {

  const response = await axios.get(
    `${API}/${roomCode}`
  );

  return response.data;
};