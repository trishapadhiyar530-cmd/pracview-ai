import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MockInterviewPage from "./pages/MockInterviewPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewResultPage from "./pages/InterviewResultPage";
import QuizSetupPage from "./pages/QuizSetupPage";
import QuizSessionPage from "./pages/QuizSessionPage";
import QuizResultPage from "./pages/QuizResultPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import AICoachPage from "./pages/AICoachPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import GroupRoomPage from "./pages/GroupRoomPage";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="dark" autoClose={2500} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <MockInterviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-session"
          element={
            <ProtectedRoute>
              <InterviewSessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-setup"
          element={
            <ProtectedRoute>
              <QuizSetupPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-session"
          element={
            <ProtectedRoute>
              <QuizSessionPage />
            </ProtectedRoute>
          }
        />
        <Route
        path="/resume-analyzer"
        element={
          <ProtectedRoute>
            <ResumeAnalyzerPage />
          </ProtectedRoute>
        }
      />
      <Route
      path="/ai-coach"
      element={
        <ProtectedRoute>
          <AICoachPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/history"
      element={
        <ProtectedRoute>
          <HistoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/group-room"
      element={
        <ProtectedRoute>
          <GroupRoomPage />
        </ProtectedRoute>
      }
    />
    <Route path="/interview-result" element={<InterviewResultPage />} />
    <Route path="/quiz-result" element={<QuizResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;