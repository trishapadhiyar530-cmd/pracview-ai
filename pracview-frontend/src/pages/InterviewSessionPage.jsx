import { useState } from "react";
import {
  FaMicrophone,
  FaArrowRight,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function InterviewSessionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const aiQuestionsText =
    location.state?.aiQuestions || "No questions generated.";

  const questions = aiQuestionsText
    .split("\n")
    .filter((q) => q.trim() !== "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const progress =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const nextQuestion = () => {
    if (!answer.trim()) return;

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestionIndex],
        answer: answer,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
    } else {
      navigate("/interview-result", {
        state: {
          questions,
          answers: updatedAnswers,
        },
      });
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-shell">

        <div className="interview-topbar">
          <div className="interview-title">
            <FaMicrophone />
            <div>
              <h1>AI Mock Interview</h1>
              <p>
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>

          <button
            className="exit-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaTimes />
          </button>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="ai-question-card">
          <div className="ai-header">
            <FaRobot />
            <span>AI Interviewer</span>
          </div>

          <div className="ai-question-text">
            {questions[currentQuestionIndex]}
          </div>
        </div>

        <div className="answer-card">
          <h3>Your Answer</h3>

          <textarea
            placeholder="Type your interview answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <div className="interview-actions">
          <button className="voice-btn">
            <FaMicrophone /> Voice Answer
          </button>

          <button
            className="next-question-btn"
            onClick={nextQuestion}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Finish Interview 🚀"
              : "Next Question"}

            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSessionPage;