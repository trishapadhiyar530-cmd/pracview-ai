import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaLaptopCode, FaDatabase, FaRocket } from "react-icons/fa";
import { generateMockInterview } from "../services/aiService";
import { toast } from "react-toastify";

function MockInterviewPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [questionCount, setQuestionCount] = useState(5);

const startInterview = async () => {
    if (!selectedRole || !difficulty || !questionCount) {
      toast.error("Complete setup first");
      return;
    }

    toast.info("Generating AI interview... 🤖");

    try {
      const userEmail = localStorage.getItem("userEmail");

      const response = await generateMockInterview({
        role: selectedRole,
        difficulty,
        count: questionCount,
        userEmail,
      });

      navigate("/interview-session", {
        state: {
          aiQuestions: response.response,
        },
      });

    } catch (error) {
      toast.error("AI interview generation failed");
    }
};

  const roles = [
    { name: "Java Developer", icon: <FaCode /> },
    { name: "Frontend Developer", icon: <FaLaptopCode /> },
    { name: "Backend Developer", icon: <FaDatabase /> },
    { name: "Full Stack Developer", icon: <FaRocket /> },
  ];

  return (
    <div className="mock-page">
      <div className="mock-container">
        <h1>Mock Interview Setup</h1>
        <p>Configure your AI-powered interview session</p>

        <div className="mock-section">
          <h2>Select Role</h2>

          <div className="role-grid">
            {roles.map((role) => (
              <div
                key={role.name}
                className={`role-card ${
                  selectedRole === role.name ? "role-active" : ""
                }`}
                onClick={() => setSelectedRole(role.name)}
              >
                <div className="role-icon">{role.icon}</div>
                <span>{role.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="difficulty-buttons">
        <button
            className={difficulty === "Beginner" ? "difficulty-active" : ""}
            onClick={() => setDifficulty("Beginner")}
        >
            Beginner
        </button>

        <button
            className={difficulty === "Intermediate" ? "difficulty-active" : ""}
            onClick={() => setDifficulty("Intermediate")}
        >
            Intermediate
        </button>

        <button
            className={difficulty === "Advanced" ? "difficulty-active" : ""}
            onClick={() => setDifficulty("Advanced")}
        >
            Advanced
        </button>
        </div>

        <div className="mock-section">
          <h2>Question Count</h2>

          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
          </select>
        </div>

        <button className="start-interview-btn" onClick={startInterview}>
          Start Mock Interview
        </button>
      </div>
    </div>
  );
}

export default MockInterviewPage;