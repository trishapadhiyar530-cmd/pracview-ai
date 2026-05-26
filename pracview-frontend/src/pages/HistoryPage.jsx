import {
  FaMicrophone,
  FaBrain,
  FaFileAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getHistory } from "../services/aiService";

function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
          console.error("No user email found");
          return;
        }

        const data = await getHistory(userEmail);

        setHistoryData(data);

      } catch (error) {
        console.error("History fetch failed");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="history-container">
        <h1>Activity History</h1>
        <p>Track your placement preparation journey</p>
        
        {historyData.length === 0 ? (
      <div className="empty-history-state">
        <div className="empty-history-card">

          <div className="sad-emoji">😔</div>

          <h2>No Activity Yet</h2>

          <p>
            Your preparation journey hasn't started yet.
            Complete a quiz, mock interview, or resume analysis
            to see your progress here 🚀
          </p>

          <button
            className="start-journey-btn"
            onClick={() => window.location.href = "/dashboard"}
          >
            Start Your Journey ✨
          </button>

        </div>
      </div>
        ) : (
          <div className="history-grid">
            {historyData.map((item, index) => (
              <div className="history-card" key={index}>
                <div className="history-icon">
                  {item.type === "QUIZ" && <FaBrain />}
                  {item.type === "INTERVIEW" && <FaMicrophone />}
                  {item.type === "RESUME" && <FaFileAlt />}
                </div>

                <div className="history-content">
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>

                  <div className="history-meta">
                    <p>{item.result.substring(0, 80)}...</p>

                    <div className="history-date">
                      <FaCalendarAlt />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;