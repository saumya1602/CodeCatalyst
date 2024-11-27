import { useRef } from "react";
import { Form } from "react-bootstrap";
import CharacterCounter from "../../../../components/CommonComponents/CharacterCounter";

function DescriptionTab({ handleInputChange, formData }) {
  const questionNameRef = useRef(null);
  const problemStatementRef = useRef(null);
  const constraintsRef = useRef(null);
  const inputFormatRef = useRef(null);
  const outputFormatRef = useRef(null);

  return (
    <>
      <div
        className="container p-4 rounded"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f9fbfd)", // Light gradient background
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
        }}
      >
        <Form.Group controlId="QuestionName" className="my-4">
          <Form.Label
            className="fw-bold"
            style={{
              color: "#1e88e5", // Bright blue for labels
            }}
          >
            Question Name *
          </Form.Label>
          <Form.Control
            defaultValue={formData.QuestionName}
            type="text"
            placeholder="Enter question name"
            ref={questionNameRef}
            maxLength={50}
            style={{
              backgroundColor: "#f4f9fc", // Light background for inputs
              border: "1px solid #1e88e5",
              color: "#333",
            }}
            onChange={(e) => handleInputChange("QuestionName", e.target.value)}
          />
          <CharacterCounter
            maxLength={50}
            textAreaRef={questionNameRef}
            fontColor="#1e88e5"
          />
        </Form.Group>

        <Form.Group controlId="ProblemStatement" className="my-4">
          <Form.Label
            className="fw-bold"
            style={{
              color: "#43a047", // Green for labels
            }}
          >
            Problem Statement *
          </Form.Label>
          <Form.Control
            defaultValue={formData.ProblemStatement}
            as="textarea"
            rows={6}
            placeholder="Enter problem statement"
            ref={problemStatementRef}
            maxLength={1800}
            style={{
              backgroundColor: "#f4f9fc",
              border: "1px solid #43a047",
              color: "#333",
            }}
            onChange={(e) =>
              handleInputChange("ProblemStatement", e.target.value)
            }
          />
          <CharacterCounter
            maxLength={1800}
            textAreaRef={problemStatementRef}
            fontColor="#43a047"
          />
        </Form.Group>

        <Form.Group controlId="Constraints" className="my-4">
          <Form.Label
            className="fw-bold"
            style={{
              color: "#1e88e5",
            }}
          >
            Constraints *
          </Form.Label>
          <Form.Control
            defaultValue={formData.Constraints}
            as="textarea"
            rows={3}
            placeholder="Enter constraints..."
            ref={constraintsRef}
            maxLength={500}
            style={{
              backgroundColor: "#f4f9fc",
              border: "1px solid #1e88e5",
              color: "#333",
            }}
            onChange={(e) =>
              handleInputChange("Constraints", e.target.value)
            }
          />
          <CharacterCounter
            maxLength={500}
            textAreaRef={constraintsRef}
            fontColor="#1e88e5"
          />
        </Form.Group>

        <Form.Group controlId="InputFormat" className="my-4">
          <Form.Label
            className="fw-bold"
            style={{
              color: "#43a047",
            }}
          >
            Input Format *
          </Form.Label>
          <Form.Control
            defaultValue={formData.InputFormat}
            as="textarea"
            rows={3}
            placeholder="Enter Input Format..."
            ref={inputFormatRef}
            maxLength={500}
            style={{
              backgroundColor: "#f4f9fc",
              border: "1px solid #43a047",
              color: "#333",
            }}
            onChange={(e) =>
              handleInputChange("InputFormat", e.target.value)
            }
          />
          <CharacterCounter
            maxLength={500}
            textAreaRef={inputFormatRef}
            fontColor="#43a047"
          />
        </Form.Group>

        <Form.Group controlId="OutputFormat" className="my-4">
          <Form.Label
            className="fw-bold"
            style={{
              color: "#1e88e5",
            }}
          >
            Output Format *
          </Form.Label>
          <Form.Control
            defaultValue={formData.OutputFormat}
            as="textarea"
            rows={3}
            placeholder="Enter Output Format..."
            ref={outputFormatRef}
            maxLength={500}
            style={{
              backgroundColor: "#f4f9fc",
              border: "1px solid #1e88e5",
              color: "#333",
            }}
            onChange={(e) =>
              handleInputChange("OutputFormat", e.target.value)
            }
          />
          <CharacterCounter
            maxLength={500}
            textAreaRef={outputFormatRef}
            fontColor="#1e88e5"
          />
        </Form.Group>
      </div>
    </>
  );
}

export default DescriptionTab;
