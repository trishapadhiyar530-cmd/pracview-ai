import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaBriefcase,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        if (!email) return;

        const data = await getProfile(email);

        setProfile(data);
        console.log(profile);
      } catch (error) {
        console.error("Profile fetch failed");
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="thinking-msg">
          🤖 Loading profile<span className="dots"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>

          <div>
            <h1>{profile.fullName}</h1>
            <p>Your PracView AI career dashboard identity</p>
          </div>
        </div>

        <div className="profile-grid">

          <div className="profile-card">
            <FaUser />
            <div>
              <span>Full Name</span>
              <h3>{profile.fullName}</h3>
            </div>
          </div>

          <div className="profile-card">
            <FaEnvelope />
            <div>
              <span>Email</span>
              <h3>{profile.email}</h3>
            </div>
          </div>

          <div className="profile-card">
            <FaUniversity />
            <div>
              <span>College</span>
              <h3>{profile.college}</h3>
            </div>
          </div>

          <div className="profile-card">
            <FaBriefcase />
            <div>
              <span>Career Goal</span>
              <h3>{profile.role}</h3>
            </div>
          </div>

          <div className="profile-card">
            <FaChartLine />
            <div>
              <span>Skill Level</span>
              <h3>Growing 🚀</h3>
            </div>
          </div>

        </div>

        <div className="profile-actions">
          <button
            className="profile-logout-btn"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;