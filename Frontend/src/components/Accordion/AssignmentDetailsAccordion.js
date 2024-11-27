import React from 'react';
import { Accordion } from 'react-bootstrap';
import { convertIsoToNormalTime, getTimeElapsed } from '../../Scripts/TimeFunctions';

function AssignmentDetailsAccordion({ PostedBy = "", PostedOn, DueTimestamp, Batches = [], Year, NumberOfQuestions, AIAssistance = false }) {
    return (
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="text-center my-3" style={{ cursor: 'pointer' }}>
                    <h4
                        style={{
                            color: "#1e88e5", // Bright blue for contrast
                            textShadow: "0px 4px 15px rgba(30, 136, 229, 0.3)",
                        }}
                    >
                        Assignment Details
                    </h4>
                </Accordion.Header>

                <Accordion.Body style={{ background: "linear-gradient(135deg, #ffffff, #f0f4f8)", padding: "20px", borderRadius: "10px", boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Posted By:</strong> {PostedBy}
                    </p>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Posted On:</strong>{" "}
                        {convertIsoToNormalTime(PostedOn).date}{" "}
                        {convertIsoToNormalTime(PostedOn).time}{" "}
                        <span className="text-muted">[ {getTimeElapsed(PostedOn)} ] </span>
                    </p>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Due Timestamp:</strong>{" "}
                        {convertIsoToNormalTime(DueTimestamp).date}{" "}
                        {convertIsoToNormalTime(DueTimestamp).time}{" "}
                        <span className="text-muted">[ {getTimeElapsed(DueTimestamp)} ]</span>
                    </p>
                    <p className="card-text" style={{ color: "#333" }}>
                        <strong>Batches:</strong>{" "}
                        {Batches.map((batch, batchIndex) => (
                            <span key={batchIndex} className="badge bg-secondary mx-1">
                                {batch}
                            </span>
                        ))}
                    </p>
                    <p className='card-text' style={{ color: "#333" }}>
                        <strong>Year:</strong>{" "}
                        <span className="badge bg-success mx-1">{Year}</span>
                    </p>
                    <p className='card-text' style={{ color: "#333" }}>
                        <strong>Questions:</strong>{" "}
                        <span className="badge bg-success mx-1">{NumberOfQuestions}</span>
                    </p>
                    <p className='card-text' style={{ color: "#333" }}>
                        <strong>AI Assistance:</strong>{" "}
                        <span className={`badge mx-1 ${AIAssistance ? 'bg-success' : 'bg-danger'}`}>
                            {AIAssistance ? "Enabled" : "Disabled"}
                        </span>
                    </p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default AssignmentDetailsAccordion;
