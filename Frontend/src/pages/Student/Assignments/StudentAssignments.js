import NavbarWithProfileAndSidebar from "../../../components/Navbar/NavbarWithProfileAndSidebar";
import RightsReservedFooter from "../../../components/Footer/RightsReservedFooter";
import StudentAssignmentNavtabs from "./StudentAssignmentNavtabs";

function StudentAssignments() {

  return (
    <div>
      <NavbarWithProfileAndSidebar TabNames={["Assignments", "Evaluations"]} TabLinks={["/students/assignments", "/students/evaluations"]} LoginType={"Students"} />
      <div className="container">
        <div className="row my-3">
          <h1 style={{ color: 'white', textAlign: 'center' }}>Assignments</h1>
        </div>
        <div className="row">
          <StudentAssignmentNavtabs activeTab="pending" />
        </div>
      </div>
      <RightsReservedFooter />
    </div>
  );
}

export default StudentAssignments;