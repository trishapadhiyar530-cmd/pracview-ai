import { useState } from "react";
import {
  FaBrain,
  FaArrowRight,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function QuizSessionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const quizQuestions = location.state?.quizQuestions || [];
  const subject = location.state?.subject || "Quiz";

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");

  const progress =
    ((current + 1) / quizQuestions.length) * 100;

  const nextQuestion = () => {
    if (!selected) return;

    if (selected === quizQuestions[current].answer) {
      setScore(score + 1);
    }

    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
      setSelected("");
    } else {
      navigate("/quiz-result", {
        state: {
          score:
            score +
            (selected === quizQuestions[current].answer ? 1 : 0),
          total: quizQuestions.length,
          subject,
          quizQuestions,
        },
      });
    }
  };

  if (!quizQuestions.length) {
    return <h1>No quiz generated.</h1>;
  }

  return (
    <div className="quiz-page">
      <div className="quiz-shell">

        <div className="quiz-topbar">
          <div className="quiz-title">
            <FaBrain />
            <div>
              <h1>{subject} AI Quiz</h1>
              <p>
                Question {current + 1} of {quizQuestions.length}
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

        <div className="quiz-question-card">
          <h2>{quizQuestions[current].question}</h2>
        </div>

        <div className="quiz-options">
          {quizQuestions[current].options.map((option) => (
            <button
              key={option}
              className={
                selected === option ? "quiz-option active" : "quiz-option"
              }
              onClick={() => setSelected(option)}
            >
              <FaCheckCircle />
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-question-btn"
          onClick={nextQuestion}
        >
          {current === quizQuestions.length - 1
            ? "Finish Quiz 🚀"
            : "Next Question"}

          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default QuizSessionPage;