import NavbarWithProfileAndSidebar from "../../../components/Navbar/NavbarWithProfileAndSidebar";
import { Tab, Nav, ListGroup } from "react-bootstrap";
import QuestionsList from "./QuestionsList";

function ProfessorQuestions({ NavTabs, NavLinks }) {
  const tabStyle = {
    background: "linear-gradient(90deg, #1e88e5, #43a047)", // Blue-green gradient
    color: "#fff",
    border: "none",
    boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)",
  };

  return (
    <>
      <NavbarWithProfileAndSidebar TabNames={NavTabs} TabLinks={NavLinks} ActiveTabIndex={2} />
      
      <div
        className="container my-3"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
          minHeight: "100vh",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="row">
          <div className="col">
            <Tab.Container defaultActiveKey="MyQuestions">
              <Nav variant="tabs" fill>
                <Nav.Item>
                  <Nav.Link eventKey="MyQuestions" style={tabStyle}>
                    My Questions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="OtherQuestions" style={tabStyle}>
                    Other Questions
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="MyQuestions">
                  <QuestionsList apiRoute="/professors/getMyQuestions" type="MyQuestions" />
                </Tab.Pane>
                <Tab.Pane eventKey="OtherQuestions">
                  <hr />
                  <ListGroup>
                    <QuestionsList apiRoute="/professors/getOtherQuestions" type="OtherQuestions" />
                  </ListGroup>
                  <hr />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorQuestions;
