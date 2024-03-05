import { Card, ListGroup } from "react-bootstrap";
import { CodeMirror } from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

function PreviewTab({ formData }) {
    return (
        <div>
            <div className="container">
                <div className="row m-3">
                    <div className="col">
                        <Card style={{ border: "none" }}>
                            <Card.Body>
                                {<div>
                                    <Card.Title style={{ textAlign: "center", fontSize: "30px" }}>
                                        {formData.QuestionName !== "" ? formData.QuestionName : "No Question Name provided"}
                                    </Card.Title>
                                    <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                        time limit per test : 1 second
                                    </Card.Subtitle>
                                    <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                        memory limit per test : {formData.QuestionName !== "" ? "30" : "256"} megabytes
                                    </Card.Subtitle>
                                    <hr />
                                </div>
                                }
                                {formData.ProblemStatement !== "" ? (
                                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign: "justify" }}>
                                        {formData.ProblemStatement}
                                    </pre>
                                ) : (
                                    <Card.Text>No Problem Statement provided</Card.Text>
                                )}
                                <br />
                                <div>
                                    <Card.Title>Constraints</Card.Title>
                                    {formData.Constraints !== "" ? (
                                        <pre>{formData.Constraints}</pre>
                                    ) : (
                                        <p>No constraints provided</p>
                                    )}
                                </div>
                                <br />
                                <div>
                                    <Card.Title>Sample Test Cases</Card.Title>
                                    {formData.TestCases.some(testcase => testcase.sampleTestCase) ? (
                                        formData.TestCases.map((testcase, index) => (
                                            testcase.sampleTestCase && (
                                                <div key={index}>
                                                    Sample Test Case {index}
                                                    <Card>
                                                        <ListGroup variant="flush" className="px-1">
                                                            <ListGroup.Item>
                                                                <div>
                                                                    <pre>{testcase.input}</pre>
                                                                </div>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Card>
                                                </div>
                                            )
                                        ))
                                    ) : (
                                        <p>No sample test cases provided</p>
                                    )}
                                    <br />
                                    <Card.Title>Hidden Test Cases</Card.Title>
                                    {formData.TestCases.some(testcase => !testcase.sampleTestCase) ? (
                                        formData.TestCases.map((testcase, index) => (
                                            !testcase.sampleTestCase && (
                                                <div key={index}>
                                                    Hidden Test Case {index}
                                                    <Card>
                                                        <ListGroup variant="flush" className="px-1">
                                                            <ListGroup.Item>
                                                                <div>
                                                                    <pre>{testcase.input}</pre>
                                                                </div>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Card>
                                                </div>
                                            )
                                        ))
                                    ) : (
                                        <p>No hidden test cases provided</p>
                                    )}
                                </div>

                                {/*
                                {formData?.SolutionCode != "" ? (
                                    <div>
                                        <br />
                                        <Card.Title>Solution Code</Card.Title>
                                        <CodeMirror
                                            value={formData.SolutionCode}
                                            // theme={myTheme}
                                            extensions={[cpp()]}
                                            editable={false}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <Card.Title>Solution Code</Card.Title>
                                        <p>No Solution Code Provided</p>
                                    </div>
                                )}
                                {formData?.RandomTestChecked && formData?.RandomTestCode != "" ? (
                                    <div>
                                        <br />
                                        <Card.Title>Random Test Code Generator</Card.Title>
                                        <CodeMirror
                                            value={formData.RandomTestCode}
                                            // theme={myTheme}
                                            extensions={[cpp()]}
                                            editable={false}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <Card.Title>Random Test Code Generator</Card.Title>
                                        <p>No Random Test Code Generator provided</p>
                                    </div>
                                )}*/}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewTab;