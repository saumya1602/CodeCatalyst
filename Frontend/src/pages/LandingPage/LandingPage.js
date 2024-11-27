import PlainNavbar from "../../components/Navbar/PlainNavbar";
import LandingPageCard from "../../components/Card/LandingPageCard";
import RightsReservedFooter from "../../components/Footer/RightsReservedFooter";

function LandingPage() {
  return (
    <>
      <PlainNavbar />
      <div
        className="landing-page"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient
          minHeight: "100vh",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Hero Section */}
        <div
          className="hero-section container text-center d-flex justify-content-center align-items-center"
          style={{
            flex: 1,
          }}
        >
          <div className="row align-items-center">
            <div className="col-12">
              <h1
                className="display-3 fw-bold mb-3 animated-heading"
                style={{
                  color: "#1e88e5", // Bright blue for contrast
                  textShadow: "0px 4px 15px rgba(30, 136, 229, 0.3)",
                }}
              >
                <span className="text-transition">Welcome</span> to{" "}
                <span className="highlight">CodeCatalyst</span>
              </h1>
              <p
                className="lead"
                style={{
                  fontSize: "1.2rem",
                  color: "#666",
                }}
              >
                "CodeCatalyst: Simplifying Coding Assignments, Empowering Learning."
              </p>
              <a
                href="#cards-section"
                className="btn btn-dark btn-lg mt-3"
                style={{
                  borderRadius: "30px",
                  padding: "12px 30px",
                  background: "linear-gradient(90deg, #1e88e5, #43a047)", // Vibrant gradient
                  border: "none",
                  color: "#fff",
                  boxShadow: "0px 6px 15px rgba(30, 136, 229, 0.4)",
                }}
                
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div id="cards-section" className="container py-5">
          <div className="row gy-4">
            {/* Cards with Glow Effects */}
            <div className="col-12 col-md-6">
              <div className="card-dark-hover">
                <LandingPageCard
                  title="CodeCatalyst for Students"
                  content="CodeCatalyst – Making Coding Simpler, Smarter"
                  btntext="Login"
                  btnlink="/studentlogin"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card-dark-hover">
                <LandingPageCard
                  title="CodeCatalyst for Professors"
                  content="CodeCatalyst for Professors – Simplify, Teach, and Inspire"
                  btntext="Login"
                  btnlink="/professorlogin"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="card-dark-hover">
                <LandingPageCard
                  title="Register Your College"
                  content="Connect, Learn, and Grow with CodeCatalyst – Join now!"
                  btntext="Register"
                  btnlink="/registercollege"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {/* <RightsReservedFooter /> */}
      </div>

      {/* Additional Styles */}
      <style jsx>{`
        /* Text Transition */
        .text-transition {
          background: linear-gradient(90deg, #1e88e5, #43a047);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow-text 4s infinite alternate;
        }

        @keyframes glow-text {
          0% {
            text-shadow: 0px 0px 10px rgba(30, 136, 229, 0.3);
          }
          100% {
            text-shadow: 0px 0px 20px rgba(30, 136, 229, 0.7);
          }
        }

        /* Card Hover Effect */
        .card-dark-hover {
          background: linear-gradient(135deg, #ffffff, #f0f4f8); /* Light gradient */
          padding: 15px;
          border-radius: 15px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
        }

        .card-dark-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0px 15px 30px rgba(30, 136, 229, 0.3);
        }

        /* Button Hover */
        .btn-dark:hover {
          background: linear-gradient(90deg, #43a047, #1e88e5);
          box-shadow: 0px 8px 20px rgba(30, 136, 229, 0.5);
        }
      `}</style>
    </>
  );
}

export default LandingPage;