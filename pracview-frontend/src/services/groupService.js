import axios from "axios";

const API =
  "http://localhost:8081/api/group";

export const createRoom = async (email) => {

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