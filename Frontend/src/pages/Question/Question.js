import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAPI } from '../../Scripts/Axios';
import { Tab, Nav, Form } from "react-bootstrap";
import QuestionDetailsPreview from '../../components/CommonComponents/QuestionDetailsPreview';
import HiddenQuestionDetailsPreview from '../../components/CommonComponents/HiddenQuestionDetailsPreview';
import { convertIsoToNormalTime, getTimeElapsed } from '../../Scripts/TimeFunctions';
import NavbarWithProfileAndSidebar from '../../components/Navbar/NavbarWithProfileAndSidebar';
import { Card, Row, Col } from 'react-bootstrap';

function Question() {
    const { _id, type } = useParams();
    const [Question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const response = await fetchAPI(`/Get${type}Question/${_id}`);
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data.message);
                    setQuestion(response.data.Question);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(`Error while fetching submission details: ${error.message}`);
            }
        };

        fetchQuestionDetails();
    }, [_id, type]);

    if (!Question) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <NavbarWithProfileAndSidebar />
            <div
                className="container my-3"
                style={{
                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
                    minHeight: "100vh",
                    color: "#333",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div className="row">
                    <div className="col">
                        <Tab.Container defaultActiveKey="Description">
                            <Nav variant="tabs" fill>
                                <Nav.Item>
                                    <Nav.Link eventKey="Description" style={{ fontSize: "20px", color: "#1e88e5" }}>Description</Nav.Link>
                                </Nav.Item>
                                {type === "Full" && (
                                    <Nav.Item>
                                        <Nav.Link eventKey="Evaluation" style={{ fontSize: "20px", color: "#1e88e5" }}>Evaluation</Nav.Link>
                                    </Nav.Item>
                                )}
                                <Nav.Item>
                                    <Nav.Link eventKey="Origin" style={{ fontSize: "20px", color: "#1e88e5" }}>Origin</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Form>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Description" style={{ color: "black" }}>
                                        <QuestionDetailsPreview
                                            QuestionName={Question.QuestionName}
                                            ProblemStatement={Question.ProblemStatement}
                                            Constraints={Question.Constraints}
                                            InputFormat={Question.InputFormat}
                                            OutputFormat={Question.OutputFormat}
                                            SampleTestCases={Question.TestCases.filter(TestCase => TestCase.sampleTestCase)}
                                            TimeLimitPerTestCase={5}
                                            MemoryLimitPerTestCase={30}
                                        />
                                    </Tab.Pane>
                                    {type === "Full" && (
                                        <Tab.Pane eventKey="Evaluation">
                                            <HiddenQuestionDetailsPreview
                                                HiddenTestCases={Question.TestCases.filter(TestCase => !TestCase.sampleTestCase)}
                                                SolutionCode={Question.SolutionCode}
                                                RandomTestChecked={Question.RandomTestChecked}
                                                RandomTestCode={Question.RandomTestCode}
                                            />
                                        </Tab.Pane>
                                    )}
                                    <Tab.Pane eventKey="Origin">
                                        <div className="container text-center">
                                            <Row>
                                                <Col>
                                                    <Card style={{ border: "none" }} className="my-3">
                                                        <Card.Body>
                                                            <div className="mb-1">
                                                                <strong>Created By:</strong> {Question?.CreatedBy?.Name} <br />
                                                                <strong>Created On:</strong>{" "}
                                                                {convertIsoToNormalTime(Question?.CreatedOn).date}{" "}
                                                                {convertIsoToNormalTime(Question?.CreatedOn).time}{" "}
                                                                <span className="text-muted">[ {getTimeElapsed(Question?.CreatedOn)} ]</span>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Form>
                        </Tab.Container>
                    </div>
                </div>
            </div>

            {/* Additional Styles for Consistent UI */}
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

export default Question;
