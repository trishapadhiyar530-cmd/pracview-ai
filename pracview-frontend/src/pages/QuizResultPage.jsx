import {
  FaTrophy,
  FaRedo,
  FaHome,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function QuizResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const subject = location.state?.subject || "Quiz";

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  let performanceMessage = "";
  let recommendation = "";

  if (percentage >= 85) {
    performanceMessage = "🔥 Excellent performance!";
    recommendation =
      "You're highly prepared. Move to advanced mock interviews.";
  } else if (percentage >= 60) {
    performanceMessage = "🚀 Good effort!";
    recommendation =
      "Strengthen weaker concepts with more practice.";
  } else {
    performanceMessage = "💪 Keep improving!";
    recommendation =
      "Revise fundamentals and retry the quiz.";
  }

  return (
    <div className="quiz-result-page">
      <div className="quiz-result-shell">

        <div className="quiz-result-header">
          <FaTrophy />
          <div>
            <h1>Quiz Complete!</h1>
            <p>{subject} AI Quiz Performance Report</p>
          </div>
        </div>

        <div className="quiz-score-grid">

          <div className="quiz-score-card">
            <FaBrain />
            <h3>Score</h3>
            <span>{score}/{total}</span>
          </div>

          <div className="quiz-score-card">
            <FaChartLine />
            <h3>Accuracy</h3>
            <span>{percentage}%</span>
          </div>

        </div>

        <div className="quiz-analysis-box">
          <h2>{performanceMessage}</h2>
          <p>{recommendation}</p>
        </div>

        <div className="result-actions">
          <button
            className="retry-btn"
            onClick={() => navigate("/quiz-setup")}
          >
            <FaRedo />
            Retry Quiz
          </button>

          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome />
            Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default QuizResultPage;