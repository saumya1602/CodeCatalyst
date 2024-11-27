import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import InfoModal from "../Modal/InfoModal";

function QuestionDetailsPreview({ QuestionName, ProblemStatement, Constraints, InputFormat, OutputFormat, SampleTestCases, TimeLimitPerTestCase, MemoryLimitPerTestCase, FormMetaData }) {
  return (
    <Card
      style={{
        border: "none",
        background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      }}
      className="my-3"
    >
      <Card.Body>
        <div>
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "25px",
              color: "#1e88e5", // Bright blue for contrast
            }}
          >
            {QuestionName && QuestionName !== "" ? QuestionName : "No Question Name provided"}
          </Card.Title>
          <Card.Subtitle
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "1rem",
            }}
            className="mb-2"
          >
            Time limit per test: {TimeLimitPerTestCase ? TimeLimitPerTestCase : "0"} second
          </Card.Subtitle>
          <Card.Subtitle
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "1rem",
            }}
            className="mb-2"
          >
            Memory limit per test: {MemoryLimitPerTestCase ? MemoryLimitPerTestCase : "0"} megabytes
          </Card.Subtitle>
          <hr />
        </div>

        {ProblemStatement && ProblemStatement !== "" ? (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              textAlign: "justify",
              color: "#333",
            }}
          >
            {ProblemStatement}
          </pre>
        ) : (
          <Card.Text>No Problem Statement provided</Card.Text>
        )}

        <br />
        <div>
          <Card.Title
            style={{
              color: "#1e88e5", // Bright blue for contrast
            }}
          >
            Constraints
          </Card.Title>
          {Constraints && Constraints !== "" ? (
            <pre style={{ color: "#333" }}>{Constraints}</pre>
          ) : (
            <p>No constraints provided</p>
          )}
        </div>

        <br />
        <div>
          <Card.Title
            style={{
              color: "#1e88e5", // Bright blue for contrast
            }}
          >
            Input Format
          </Card.Title>
          {InputFormat && InputFormat !== "" ? (
            <pre style={{ color: "#333" }}>{InputFormat}</pre>
          ) : (
            <p>No Input Format provided</p>
          )}
        </div>

        <br />
        <div>
          <Card.Title
            style={{
              color: "#1e88e5", // Bright blue for contrast
            }}
          >
            Output Format
          </Card.Title>
          {OutputFormat !== "" ? (
            <pre style={{ color: "#333" }}>{OutputFormat}</pre>
          ) : (
            <p>No OutputFormat provided</p>
          )}
        </div>

        <br />
        <div>
          <Card.Title
            style={{
              color: "#1e88e5", // Bright blue for contrast
            }}
          >
            Sample Test Cases
            <InfoModal info={FormMetaData?.SampleTestCasesInfoModal} />
          </Card.Title>
          {SampleTestCases?.length ? (
            SampleTestCases.map((testcase, index) => (
              testcase.sampleTestCase && (
                <div key={index}>
                  Sample Test Case {index}
                  <Card
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
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
        </div>
      </Card.Body>
    </Card>
  );
}

export default QuestionDetailsPreview;
