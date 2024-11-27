import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import InfoModal from "../Modal/InfoModal";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
import { githubDark } from '@uiw/codemirror-theme-github'; // GitHub theme

function HiddenQuestionDetailsPreview({ HiddenTestCases, SolutionCode, RandomTestChecked, RandomTestCode, FormMetaData }) {
    return (
        <Card style={{ border: "none" }} className="my-3">
            <Card.Body>
                {/* Title */}
                <Card.Title style={{ color: "#1e88e5" }}>
                    Hidden Test Cases <InfoModal info={FormMetaData?.HiddenTestCasesInfoModal} />
                </Card.Title>
                
                {/* Hidden Test Cases Section */}
                {HiddenTestCases.length ? (
                    HiddenTestCases.map((testcase, index) => (
                        <div key={index}>
                            <Card style={{ marginBottom: '10px', background: 'linear-gradient(135deg, #ffffff, #f0f4f8)', borderRadius: '10px' }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item style={{ padding: '12px' }}>
                                        <pre>{testcase.input}</pre>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p style={{ color: "#666" }}>No hidden test cases provided</p>
                )}

                {/* Solution Code Section */}
                {SolutionCode !== "" ? (
                    <div>
                        <br />
                        <Card.Title style={{ color: "#1e88e5" }}>Solution Code <InfoModal info={FormMetaData?.SolutionInfoButtonDescription} /> </Card.Title>
                        <CodeMirror
                            value={SolutionCode}
                            theme={githubDark}
                            extensions={[cpp()]}
                            editable={false}
                        />
                    </div>
                ) : (
                    <div>
                        <br />
                        <Card.Title style={{ color: "#1e88e5" }}>Solution Code</Card.Title>
                        <p style={{ color: "#666" }}>No Solution Code Provided</p>
                    </div>
                )}

                {/* Random Test Case Section */}
                {RandomTestChecked ? (
                    <div>
                        <br />
                        <Card.Title style={{ color: "#1e88e5" }}>Random Test Case Generator <InfoModal info={FormMetaData?.SolutionInfoButtonDescription} /> </Card.Title>
                        <CodeMirror
                            value={RandomTestCode}
                            theme={githubDark}
                            extensions={[cpp()]}
                            editable={false}
                        />
                    </div>
                ) : (
                    <div>
                        <br />
                        <Card.Title style={{ color: "#1e88e5" }}>Random Test Case Generator <InfoModal info={FormMetaData?.RandomTestCaseInfoButtonDescription} /> </Card.Title>
                        <p style={{ color: "#666" }}>No Random Test Code Generator provided</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default HiddenQuestionDetailsPreview;
