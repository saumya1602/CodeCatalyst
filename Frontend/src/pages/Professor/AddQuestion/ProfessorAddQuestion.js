import { useEffect, useState } from "react";
import NavbarWithProfileAndSidebar from "../../../components/Navbar/NavbarWithProfileAndSidebar";
import { Form, Nav, Tab } from "react-bootstrap";
import DescriptionTab from "./NavTabs/DescriptionTab";
import CodeTab from "./NavTabs/CodeTab/CodeTab";
import TestcasesTab from "./NavTabs/TestcasesTab";
import PreviewTab from "./NavTabs/PreviewTab";
import { fetchData } from "../../../Scripts/Axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/Spinners/Spinners";

let DefaultSolutionCode =
  `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`;

let DefaultRandomTestCode =
  `#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main() {
    srand(time(0));
    int randomNumber = rand() % 99 + 1;
    cout << randomNumber;
    return 0;
}`;

function ProfessorAddQuestion({ activeTab, NavTabs = [], NavLinks = [], editQuestion = false }) {
  const { _id } = useParams();
  const [Loading, setLoading] = useState(editQuestion);

  const [formData, setFormData] = useState({
    QuestionName: '',
    ProblemStatement: '',
    Constraints: "",
    InputFormat: "",
    OutputFormat: "",
    SolutionCode: DefaultSolutionCode,
    RandomTestChecked: false,
    RandomTestCode: DefaultRandomTestCode,
    TestCases: []
  });

  const FormMetaData = {
    SolutionCodeTabDescription: "Provide the correct solution code for evaluation.",
    RandomTestCodeTabDescription: "Generate random test cases matching the input format.",
    HiddenTestCasesInfoModal: "Hidden test cases are not visible to the user and are used for evaluation.",
    SampleTestCasesInfoModal: "Sample test cases are visible to the user and are used for understanding the problem."
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    if (editQuestion) {
      fetchData(`/GetFullQuestion/${_id}`, setFormData, "Question", "Error while fetching question details");
      setLoading(false);
    }
  }, [editQuestion, _id]);

  if (Loading) {
    return (<LoadingSpinner />);
  }

  return (
    <>
      {!editQuestion && <NavbarWithProfileAndSidebar TabNames={NavTabs} TabLinks={NavLinks} ActiveTabIndex={1} />}
      <div
        className="container-fluid p-4"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient
          minHeight: "100vh",
          color: "#333"
        }}
      >
        <div className="row text-center mb-5">
          <div className="col">
            <h1
              className="fw-bold"
              style={{
                color: "#1e88e5", // Bright blue for contrast
                textShadow: "0px 4px 15px rgba(30, 136, 229, 0.3)"
              }}
            >
              {editQuestion ? "Edit Question" : "Add Question"}
            </h1>
          </div>
        </div>
        <div className="row">
          <Tab.Container defaultActiveKey={activeTab}>
            <Nav
              variant="pills"
              className="justify-content-center mb-4"
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              {["Description", "Code", "TestCases", "Preview"].map((tab, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    eventKey={tab}
                    className="rounded-pill px-4 py-2"
                    style={{
                      background: "linear-gradient(90deg, #1e88e5, #43a047)", // Vibrant gradient
                      color: "#fff",
                      boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {tab}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Form>
              <Tab.Content>
                <Tab.Pane eventKey="Description">
                  <DescriptionTab handleInputChange={handleInputChange} formData={formData} />
                </Tab.Pane>
                <Tab.Pane eventKey="Code">
                  <CodeTab formData={formData} handleInputChange={handleInputChange} />
                </Tab.Pane>
                <Tab.Pane eventKey="TestCases">
                  <TestcasesTab
                    TestCases={formData.TestCases.map(({ _id, ...testCase }) => testCase)}
                    handleInputChange={handleInputChange}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Preview">
                  <PreviewTab formData={formData} FormMetaData={FormMetaData} editQuestion={editQuestion} _id={_id} />
                </Tab.Pane>
              </Tab.Content>
            </Form>
          </Tab.Container>
        </div>
      </div>

      <style jsx>{`
        .nav-pills .nav-link.active {
          background: linear-gradient(90deg, #43a047, #1e88e5) !important;
          box-shadow: 0px 5px 15px rgba(30, 136, 229, 0.4) !important;
        }
        .nav-pills .nav-link {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .nav-pills .nav-link:hover {
          transform: scale(1.05);
          box-shadow: 0px 5px 15px rgba(30, 136, 229, 0.3);
        }
      `}</style>
    </>
  );
}

export default ProfessorAddQuestion;
