import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnalytics } from "../services/aiService";
import {
  FaBrain,
  FaMicrophone,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";

function DashboardPage() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({
    totalActivities: 0,
    quizCount: 0,
    interviewCount: 0,
    resumeCount: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        

        if (!userEmail) return;

        const data = await getAnalytics(userEmail);

        setAnalytics(data);

      } catch (error) {
        console.error("Analytics fetch failed");
      }
    };

    fetchAnalytics();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h1 className="sidebar-logo">PracView AI</h1>

        <nav className="sidebar-nav">
          <button>Dashboard</button>

          <button onClick={() => navigate("/group-room")}>
            Group Practice
          </button>

          <button onClick={() => navigate("/ai-coach")}>
            Ask AI Career Coach
          </button>

          <button onClick={() => navigate("/history")}>
            History
          </button>

          <button onClick={() => navigate("/profile")}>
            Profile
          </button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">

        <section className="welcome-card premium-welcome">
          <h2>Welcome back 🚀</h2>
          <p>
            Your AI-powered placement preparation command center.
          </p>
        </section>

        <section className="stats-grid">

          <div className="stat-card premium-stat">
            <FaChartLine />
            <h3>{analytics.totalActivities}</h3>
            <p>Total Activities</p>
          </div>

          <div className="stat-card premium-stat">
            <FaBrain />
            <h3>{analytics.quizCount}</h3>
            <p>AI Quizzes</p>
          </div>

          <div className="stat-card premium-stat">
            <FaMicrophone />
            <h3>{analytics.interviewCount}</h3>
            <p>Mock Interviews</p>
          </div>

          <div className="stat-card premium-stat">
            <FaFileAlt />
            <h3>{analytics.resumeCount}</h3>
            <p>Resume Reviews</p>
          </div>

        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="action-grid">
            <button onClick={() => navigate("/mock-interview")}>
              Start Mock Interview
            </button>

            <button onClick={() => navigate("/quiz-setup")}>
              Start Quiz
            </button>

            <button onClick={() => navigate("/resume-analyzer")}>
              Resume Analyzer
            </button>
          </div>
        </section>

        <section className="motivation-panel">
          <h2>🔥 AI Motivation</h2>
          <p>
            Every interview you practice increases your confidence.
            Every quiz sharpens your skills.
            Keep going — your placement is getting closer 🚀
          </p>
        </section>

      </main>
    </div>
  );
}

export default DashboardPage;