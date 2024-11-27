import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import VerdictBadge from "../../../../../../components/CommonComponents/VerdictBadge";
import CharacterCounter from "../../../../../../components/CommonComponents/CharacterCounter";

function TestSolutionCodeModal({ SolutionCodeToTest }) {
    const [showModal, setShowModal] = useState(false);
    const validationTestCaseRef = useRef(null);
    const expectedOutputRef = useRef(null);

    // To display the ws response message from the server
    const [responseMessage, setResponseMessage] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
        setResponseMessage(null);
    };
    const handleShowModal = () => setShowModal(true);

    const handleValidateSolutionCode = async () => {
        try {
            const socketUrl = `${process.env.REACT_APP_SERVER_WS_URL}/validateSolutionCode`;
            const socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                try {
                    console.log('WebSocket connection opened');
                    socket.send(JSON.stringify({
                        type: 'Validation',
                        SolutionCodeToTest: SolutionCodeToTest,
                        validationTestCaseValue: validationTestCaseRef.current.value,
                        expectedOutputValue: expectedOutputRef.current.value
                    }));
                } catch (error) {
                    toast.error(`Error sending data: ${error.message}`);
                    socket.close();
                }
            };

            socket.onmessage = (event) => {
                try {
                    const response = JSON.parse(event.data);
                    setResponseMessage({
                        message: response.message || '',
                        verdict: response.verdict || ''
                    });
                    if (response.success === false) {
                        socket.close();
                    }
                } catch (error) {
                    toast.error(`Error parsing response: ${error.message}`);
                    socket.close();
                }
            };

            socket.onerror = (error) => {
                toast.error(`WebSocket error: ${error.message}`);
                socket.close();
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        } catch (error) {
            toast.error(`Error while creating WebSocket connection: ${error.message}`);
        }
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowModal}
                className="my-3 w-100 py-3"
                style={{
                    background: "linear-gradient(90deg, #1e88e5, #43a047)",
                    color: "#fff",
                    boxShadow: "0px 4px 12px rgba(30, 136, 229, 0.3)"
                }}
            >
                Validate Code
                <FontAwesomeIcon icon={faCode} className="ms-2" />
            </Button>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                dialogClassName="modal-custom"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Validate Code
                        <FontAwesomeIcon icon={faCode} className="ms-2" />
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-dark" style={{ background: '#f4f7fa', padding: '2rem' }}>
                    <Form.Group controlId="validationTestCase" className="my-3">
                        <Form.Label>Validation Input Test Case</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            maxLength={200}
                            placeholder="Enter validation input test case..."
                            ref={validationTestCaseRef}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid #dcdfe6',
                                padding: '1rem',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <CharacterCounter maxLength={200} textAreaRef={validationTestCaseRef} />
                    </Form.Group>

                    <Form.Group controlId="expectedOutput" className="my-3">
                        <Form.Label>Expected Output</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            maxLength={200}
                            placeholder="Enter expected output..."
                            ref={expectedOutputRef}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid #dcdfe6',
                                padding: '1rem',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <CharacterCounter maxLength={200} textAreaRef={expectedOutputRef} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={handleValidateSolutionCode}
                        className="w-100 py-3"
                        style={{
                            background: "linear-gradient(90deg, #ff7043, #43a047)",
                            color: "#fff",
                            boxShadow: "0px 4px 12px rgba(255, 112, 67, 0.3)",
                        }}
                    >
                        Test Code
                    </Button>

                    {/* Only show this if responseMessage is not null */}
                    {responseMessage && (
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        className="alert alert-primary mt-3 text-center"
                                        role="alert"
                                        style={{
                                            borderRadius: '10px',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <p>{responseMessage.message}</p>
                                        <hr />
                                        <p className="mb-0">{<VerdictBadge verdict={responseMessage.verdict} />}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>

            <style jsx>{`
                .modal-custom .modal-content {
                    border-radius: 12px;
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
                    background: #f4f7fa;
                }

                .modal-custom .modal-header {
                    background: linear-gradient(90deg, #1e88e5, #43a047);
                    color: #fff;
                    border-bottom: none;
                }

                .modal-custom .modal-footer {
                    background: linear-gradient(90deg, #ff7043, #43a047);
                    color: #fff;
                    border-top: none;
                }

                .btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 5px 15px rgba(30, 136, 229, 0.4);
                }
            `}</style>
        </>
    );
}

export default TestSolutionCodeModal;
