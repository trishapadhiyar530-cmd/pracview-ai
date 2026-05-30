import { useState } from "react";
import { useEffect } from "react";
import { FaUsers, FaPlusCircle, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createRoom,
  joinRoom,
  getRoom
} from "../services/groupService";

function GroupRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {

    const email =
      localStorage.getItem("userEmail");

    setParticipants([
      {
        name: email || "Guest",
        status: "Ready",
      },
    ]);

  }, []);

  const handleCreateRoom = async () => {
    try {

      const userEmail =
        localStorage.getItem("userEmail");

      const response =
        await createRoom(userEmail);

      setRoomCode(response.roomCode);

      setJoined(true);

      toast.success(
        `Room created! Code: ${response.roomCode}`
      );

    } catch (error) {

      console.error(error);

      toast.error("Failed to create room");
    }
  };

  const handleJoinRoom = async () => {

    try {

      const email =
        localStorage.getItem("userEmail");

      const room =
        await joinRoom(roomCode, email);

      const users =
        room.participants.split(",");

      setParticipants(
        users.map(user => ({
          name: user,
          status: "Ready"
        }))
      );

      setJoined(true);

      toast.success(
        "Joined room successfully"
      );

    } catch (error) {

      toast.error(
        "Room not found"
      );
    }
  };
  const loadRoom = async () => {

    const room =
      await getRoom(roomCode);

    const users =
      room.participants.split(",");

    setParticipants(
      users.map(user => ({
        name: user,
        status: "Ready"
      }))
    );
  };

  return (
    <div className="group-page">
      <div className="group-container">
        <div className="group-header">
          <FaUsers />
          <div>
            <h1>Group Practice Room</h1>
            <p>Practice interviews and quizzes with friends</p>
          </div>
        </div>

        {!joined ? (
          <div className="group-actions">
            <button onClick={handleCreateRoom}>
              <FaPlusCircle /> Create Room
            </button>

            <div className="join-room-box">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />

              <button onClick={handleJoinRoom}>
                <FaSignInAlt /> Join Room
              </button>
            </div>
          </div>
        ) : (
          <div className="room-dashboard">
            <div className="room-code-card">
              <h2>Room Code</h2>
              <h3>{roomCode}</h3>
            </div>

            <div className="participants-section">
              <h2>Participants</h2>

              {participants.map((participant, index) => (
                <div className="participant-card" key={index}>
                  <span>{participant.name}</span>
                  <span className={participant.status === "Ready" ? "ready" : "waiting"}>
                    {participant.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="start-group-btn">
              Start Group Practice
            </button>
            <button className="start-group-btn" onClick={loadRoom}>
            Refresh Participants
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupRoomPage;