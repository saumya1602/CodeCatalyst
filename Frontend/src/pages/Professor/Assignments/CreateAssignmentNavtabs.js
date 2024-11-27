import React, { useState } from "react";
import { Tab, Nav, Form } from "react-bootstrap";
import OverviewTab from "./Tabs/OverviewTab";
import TargetStudentsTab from "./Tabs/TargetStudentsTab";
import QuestionsTab from "./Tabs/QuestionsTab";
import { toast } from "react-toastify";
import { postData } from "../../../Scripts/Axios";

// Main component
function CreateAssignmentNavtabs({ activeTab, Batches, MyQuestions, OtherQuestions }) {
    const [formData, setFormData] = useState({
        AssignmentName: "",
        DueTimestamp: "",
        Year: "",
        Batches: [],
        Questions: [],
        AIAssistance: false
    });

    // Handle form submission
    const handleSubmit = async () => {
        // Basic form validation
        if (!formData.AssignmentName || !formData.DueTimestamp || formData.Batches.length === 0 || formData.Questions.length === 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Make the API call to create the assignment
            await postData("/professors/createAssignment", formData, "Error while creating assignment", () => {
                toast.success("Assignment created successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
        } catch (error) {
            // Handle submission error
            toast.error("There was an error creating the assignment.");
        }
    };

    return (
        <Tab.Container defaultActiveKey={activeTab}>
            <Nav variant="tabs" defaultActiveKey={activeTab} fill>
                <Nav.Item>
                    <Nav.Link eventKey="OverviewTab" style={{ background: "linear-gradient(90deg, #1e88e5, #43a047)", color: "#fff", boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)", fontWeight: "bold", transition: "all 0.3s ease" }}>Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="TargetStudents" style={{ background: "linear-gradient(90deg, #1e88e5, #43a047)", color: "#fff", boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)", fontWeight: "bold", transition: "all 0.3s ease" }}>Target Students</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Questions" style={{ background: "linear-gradient(90deg, #1e88e5, #43a047)", color: "#fff", boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)", fontWeight: "bold", transition: "all 0.3s ease" }}>Questions</Nav.Link>
                </Nav.Item>
            </Nav>
            <Form>
                <Tab.Content>
                    <OverviewTab formData={formData} setFormData={setFormData} />
                    <TargetStudentsTab formData={formData} setFormData={setFormData} Batches={Batches} />
                    <Tab.Pane eventKey="Questions">
                        <QuestionsTab setFormData={setFormData} MyQuestions={MyQuestions} OtherQuestions={OtherQuestions} handleSubmit={handleSubmit} />
                    </Tab.Pane>
                </Tab.Content>
            </Form>
        </Tab.Container>
    );
}

export default CreateAssignmentNavtabs;
