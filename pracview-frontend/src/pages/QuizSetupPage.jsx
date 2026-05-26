import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateQuiz } from "../services/aiService";

function QuizSetupPage() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [count, setCount] = useState("5");

  const startQuiz = async () => {
    if (!subject) {
      toast.error("Please select a subject");
      return;
    }

    toast.info("Generating AI quiz... 🤖");

    try {
      const userEmail = localStorage.getItem("userEmail");

      const quizData = await generateQuiz({
        subject,
        difficulty,
        count,
        userEmail,
      });

      navigate("/quiz-session", {
        state: {
          quizQuestions: quizData,
          subject,
          difficulty,
        },
      });

    } catch (error) {
      toast.error("Quiz generation failed.");
    }
  };

  return (
    <div className="mock-page">
      <div className="mock-container">
        <h1>Quiz Setup</h1>
        <p>Challenge yourself and improve your technical skills</p>

        <div className="mock-section">
          <h2>Select Subject</h2>

          <div className="difficulty-buttons">
            <button
              className={subject === "Java" ? "difficulty-active" : ""}
              onClick={() => setSubject("Java")}
            >
              Java
            </button>

            <button
              className={subject === "React" ? "difficulty-active" : ""}
              onClick={() => setSubject("React")}
            >
              React
            </button>

            <button
              className={subject === "DBMS" ? "difficulty-active" : ""}
              onClick={() => setSubject("DBMS")}
            >
              DBMS
            </button>

            <button
              className={subject === "DSA" ? "difficulty-active" : ""}
              onClick={() => setSubject("DSA")}
            >
              DSA
            </button>
          </div>
        </div>

        <div className="mock-section">
          <h2>Difficulty</h2>

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
        </div>

        <div className="mock-section">
          <h2>Question Count</h2>

          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
          </select>
        </div>

        <button className="start-interview-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizSetupPage;