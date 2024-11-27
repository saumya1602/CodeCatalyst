import NavbarWithProfileAndSidebar from "../../../components/Navbar/NavbarWithProfileAndSidebar";
import StudentAssignmentNavtabs from "./StudentAssignmentNavtabs";

function StudentAssignments() {
  return (
    <div>
      <NavbarWithProfileAndSidebar 
        TabNames={["Assignments"]} 
        TabLinks={["/students/assignments"]} 
        ActiveTabIndex={0} 
      />
      <div className="container">
        <div className="row my-3">
          <h1 style={{ color: '#1e88e5', textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Assignments
          </h1>
        </div>
        <div className="row">
          <StudentAssignmentNavtabs activeTab="pending" />
        </div>
      </div>
      
      <style jsx>{`
        .container {
          background: linear-gradient(135deg, #ffffff, #f0f4f8); /* Light gradient background */
          min-height: 100vh;
          color: #333;
          padding: 20px;
          border-radius: 10px;
        }

        h1 {
          color: #1e88e5; /* Bright blue for contrast */
          text-shadow: 0px 4px 15px rgba(30, 136, 229, 0.3);
        }

        .container .row {
          margin-bottom: 20px;
        }

        /* Adding hover effect to assignment tabs */
        .nav-link-custom {
          background: linear-gradient(90deg, #1e88e5, #43a047); /* Gradient background */
          color: white;
          border-radius: 25px;
          padding: 10px 20px;
          font-weight: bold;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .nav-link-custom:hover {
          background: linear-gradient(90deg, #43a047, #1e88e5);
          transform: scale(1.05);
        }

        .nav-link-custom.active {
          background: linear-gradient(135deg, #1e88e5, #43a047); /* Active tab gradient */
          color: #fff;
        }

        /* Tab Pane Background */
        .tab-content {
          background: #f0f4f8; /* Light gradient background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 15px rgba(30, 136, 229, 0.1);
        }
      `}</style>
    </div>
  );
}

export default StudentAssignments;
