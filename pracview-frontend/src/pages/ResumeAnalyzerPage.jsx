import { useState } from "react";
import { FaFileUpload, FaRobot ,FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { analyzeResume } from "../services/aiService";

function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const analyzeResumeFile = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await analyzeResume(file, userEmail);

      setAnalysis(response.analysis || response.result || JSON.stringify(response));
      setShowAnalysis(true);

    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      console.log(error.message);

      setAnalysis("⚠️ Resume analysis failed.");
      setShowAnalysis(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-container">
        <h1>AI Resume Analyzer</h1>
        <p>Upload your resume and get instant career insights</p>

        <div className="upload-box">
          <FaFileUpload className="upload-icon" />
          <input type="file" onChange={handleUpload} />
          {fileName && <span>{fileName}</span>}
        </div>

        <button className="analyze-btn" onClick={analyzeResumeFile}>
          Analyze Resume
        </button>

        {showAnalysis && (
          <div className="analysis-section">
            {loading ? (
              <div className="thinking-msg">
                🤖 AI analyzing your resume<span className="dots"></span>
              </div>
            ) : (
              <div className="analysis-section">
                <div className="analysis-header">
                  <FaRobot />
                  <h2>AI Resume Evaluation</h2>
                </div>

                <pre className="resume-analysis-box">
                  {analysis}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzerPage;