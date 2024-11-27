import NavbarWithProfileAndSidebar from '../../../components/Navbar/NavbarWithProfileAndSidebar';
import CreatedAssignments from './CreatedAssignments';
import CreateAssignmentModal from './CreateAssignmentModal';

function ProfessorAssignments({ NavTabs, NavLinks }) {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Navbar with Profile and Sidebar */}
      <NavbarWithProfileAndSidebar 
        TabNames={NavTabs} 
        TabLinks={NavLinks} 
        ActiveTabIndex={0} 
      />

      <div className="container px-3">
        {/* Page Title */}
        <div className="row my-3">
          <h1 className="text-center" style={{ color: '#1e88e5', fontSize: '36px' }}>
            ASSIGNMENTS
          </h1>
        </div>

        {/* Create Assignment Button */}
        <div className="row">
          <div className="col">
            <CreateAssignmentModal />
          </div>
        </div>

        {/* List of Created Assignments */}
        <div className="row">
          <div className="col text-center">
            <CreatedAssignments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorAssignments;
