import { Form } from "react-bootstrap";
import CharacterCounter from "../../../components/CommonComponents/CharacterCounter";
import { useRef } from "react";

function TestCase({ index, toggleSample, name, isChecked, input, updateTestcase }) {
  const textAreaRef = useRef(null);

  return (
    <Form.Group
      controlId={`inputTestcase${index + 1}`}
      className="p-3 rounded"
      style={{
        background: "linear-gradient(135deg, #1c1c1e, #2a2a2c)", // Dark gradient
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        color: "#ffffff", // White text for contrast
        border: "1px solid #3a3a3c",
        marginBottom: "1.5rem"
      }}
    >
      <Form.Label
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#e91e63", // Vibrant pink for label
          marginBottom: "0.5rem"
        }}
      >
        {name}
      </Form.Label>
      <Form.Check
        type="switch"
        id={`sampleToggle${index + 1}`}
        label="Sample Testcase"
        checked={isChecked}
        onChange={() => toggleSample(index)}
        className="mb-3"
        style={{
          fontSize: "1rem",
          fontWeight: "500",
          color: "#ffffff"
        }}
      />
      <Form.Control
        as="textarea"
        placeholder={`Enter ${name}`}
        maxLength={200}
        value={input}
        onChange={(e) => updateTestcase(index, e.target.value)}
        ref={textAreaRef}
        style={{
          background: "#1f1f1f", // Darker background for textarea
          border: "1px solid #3a3a3c",
          borderRadius: "5px",
          color: "#ffffff",
          fontSize: "1rem",
          padding: "0.8rem",
          boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.4)"
        }}
      />
      <CharacterCounter
        maxLength={200}
        textAreaRef={textAreaRef}
        fontColor="#e91e63" // Match with label's pink accent
      />
    </Form.Group>
  );
}

export default TestCase;
