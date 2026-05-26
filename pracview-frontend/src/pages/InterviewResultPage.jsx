import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaRedo,
  FaHome,
  FaRobot,
  FaChartLine,
  FaBolt,
  FaComments,
} from "react-icons/fa";
import { evaluateInterview } from "../services/aiService";

function InterviewResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const answers = location.state?.answers || [];

  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        const result = await evaluateInterview({
          questions,
          answers,
          userEmail,
        });

        setEvaluation(
          typeof result === "string" ? result : result.response
        );
      } catch (error) {
        setEvaluation(
          "⚠️ AI evaluation failed. Please retry your interview."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, []);

  return (
    <div className="result-page">
      <div className="result-shell">

        <div className="result-header">
          <div className="result-title">
            <FaRobot />
            <div>
              <h1>AI Interview Evaluation</h1>
              <p>Your personalized performance analysis</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="evaluation-loading">
            <div className="thinking-msg">
              🤖 Evaluating your interview<span className="dots"></span>
            </div>

            <p>
              Analyzing technical depth, communication, confidence &
              improvement opportunities 🚀
            </p>
          </div>
        ) : (
          <>
            <div className="score-cards">

              <div className="scores-card">
                <FaChartLine />
                <h3>Technical</h3>
                <span>AI Scored</span>
              </div>

              <div className="scores-card">
                <FaComments />
                <h3>Communication</h3>
                <span>AI Reviewed</span>
              </div>

              <div className="scores-card">
                <FaBolt />
                <h3>Confidence</h3>
                <span>AI Evaluated</span>
              </div>

            </div>

            <div className="evaluation-box">
              <pre>{evaluation}</pre>
            </div>

            <div className="result-actions">
              <button
                className="retry-btn"
                onClick={() => navigate("/mock-interview")}
              >
                <FaRedo />
                Retry Interview
              </button>

              <button
                className="dashboard-btn"
                onClick={() => navigate("/dashboard")}
              >
                <FaHome />
                Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InterviewResultPage;