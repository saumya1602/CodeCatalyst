import React from 'react';
import { Accordion } from 'react-bootstrap';
import { convertIsoToNormalTime, getTimeElapsed } from '../../Scripts/TimeFunctions';

function QuestionDetailsAccordion({ Name = "", CreatedOn }) {
    return (
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="text-center my-3" style={{ cursor: 'pointer' }}>
                    <h5
                        style={{
                            color: "#1e88e5", // Bright blue for contrast
                            textShadow: "0px 4px 15px rgba(30, 136, 229, 0.3)",
                        }}
                    >
                        Question Details
                    </h5>
                </Accordion.Header>

                <Accordion.Body
                    style={{
                        background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Created By:</strong>{" "}
                        <span className="value">{Name}</span>
                    </p>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Created On:</strong>{" "}
                        <span className="value">{convertIsoToNormalTime(CreatedOn).date}</span>{" "}
                        <span className="value">{convertIsoToNormalTime(CreatedOn).time}</span>
                    </p>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Time Elapsed:</strong>{" "}
                        <span className="value">{getTimeElapsed(CreatedOn)}</span>
                    </p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default QuestionDetailsAccordion;
