import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <h1 className="logo">PracView AI</h1>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h2>
            Practice Smarter.
            <br />
            Perform Better.
          </h2>

          <p>
            AI-powered interview practice, skill improvement, and career
            preparation designed for students.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Start Free
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;