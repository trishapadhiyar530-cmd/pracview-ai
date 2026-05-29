import { useState } from "react";
import { FaUsers, FaPlusCircle, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function GroupRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);

  const participants = [
    { name: "Trisha", status: "Ready" },
    { name: "Aarav", status: "Waiting" },
    { name: "Neha", status: "Ready" },
  ];

  const createRoom = () => {
    toast.success("Room created! Code: PV2025");
    setJoined(true);
  };

  const joinRoom = () => {
    if (!roomCode.trim()) {
      toast.error("Enter room code");
      return;
    }

    const response = await createRoom(userEmail);

    setRoomCode(response.roomCode);
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
            <button onClick={createRoom}>
              <FaPlusCircle /> Create Room
            </button>

            <div className="join-room-box">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />

              <button onClick={joinRoom}>
                <FaSignInAlt /> Join Room
              </button>
            </div>
          </div>
        ) : (
          <div className="room-dashboard">
            <div className="room-code-card">
              <h2>Room Code</h2>
              <h3>PV2025</h3>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupRoomPage;