import { Nav, Tab } from 'react-bootstrap';
import { useState } from 'react';
import AssignmentList from './AssignmentList';

function StudentAssignmentNavtabs({ activeTab }) {
    // State to store the active tab
    const [currentTab, setCurrentTab] = useState(activeTab);

    // State to control the visibility of components
    const [showPending, setShowPending] = useState(currentTab === 'pending');
    const [showMissed, setShowMissed] = useState(currentTab === 'missed');
    const [showSubmitted, setShowSubmitted] = useState(currentTab === 'submitted');

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setShowPending(tab === 'pending');
        setShowMissed(tab === 'missed');
        setShowSubmitted(tab === 'submitted');
    };

    return (
        <Tab.Container defaultActiveKey={activeTab}>
            <Nav variant="tabs" defaultActiveKey={activeTab} fill onSelect={handleTabChange}>
                <Nav.Item>
                    <Nav.Link eventKey="pending" className="nav-link-custom">Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="missed" className="nav-link-custom">Missed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="submitted" className="nav-link-custom">Submitted</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="pending" style={{ color: "#333" }}>
                    {showPending && (
                        <AssignmentList listType={"Pending"} />
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="missed" style={{ color: "#333" }}>
                    {showMissed && (
                        <AssignmentList listType={"Missed"}/>
                    )}
                </Tab.Pane>
                <Tab.Pane eventKey="submitted" style={{ color: "#333" }}>
                    {showSubmitted && (
                        <AssignmentList listType={"Submitted"} />
                    )}
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}

export default StudentAssignmentNavtabs;

// Additional Styles
<style jsx>{`
  /* Nav Link Style */
  .nav-link-custom {
    background: linear-gradient(90deg, #1e88e5, #43a047); /* Gradient Background */
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
    background: linear-gradient(135deg, #1e88e5, #43a047); /* Active Tab */
    color: #fff;
  }

  /* Tab Container Background */
  .tab-content {
    background: #f0f4f8; /* Light gradient background */
    padding: 20px;
    border-radius: 10px;
  }

  /* Add a subtle box shadow for tab panes */
  .tab-pane {
    box-shadow: 0px 4px 15px rgba(30, 136, 229, 0.1);
  }
`}</style>
