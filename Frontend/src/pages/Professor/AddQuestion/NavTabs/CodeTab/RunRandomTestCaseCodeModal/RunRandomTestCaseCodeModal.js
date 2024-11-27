import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import VerdictBadge from '../../../../../../components/CommonComponents/VerdictBadge';

function RunRandomTestCaseCodeModal({ CodeToRun }) {
    const [showModal, setShowModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => {
        setShowModal(true);
        console.log("Code to run:", CodeToRun);

        try {
            const socketUrl = `${process.env.REACT_APP_SERVER_WS_URL}/RunRandomTestCaseCode`;
            const socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                try {
                    console.log('WebSocket connection opened');
                    socket.send(JSON.stringify({
                        type: 'RunRandomTestCaseCode',
                        RandomTestCaseCode: CodeToRun
                    }));
                } catch (error) {
                    toast.error(`Error sending message: ${error.message}`);
                    socket.close();
                }
            };

            socket.onmessage = (event) => {
                try {
                    const response = JSON.parse(event.data);
                    console.log(response);
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
                className="w-100 py-3"
                style={{
                    background: "linear-gradient(90deg, #1e88e5, #43a047)",
                    color: "#fff",
                    boxShadow: "0px 4px 12px rgba(30, 136, 229, 0.3)"
                }}
            >
                Test Code
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
                        Test Code
                        <FontAwesomeIcon icon={faCode} className="ms-2" />
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-dark" style={{ background: '#f4f7fa', padding: '2rem' }}>
                    {responseMessage && (
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        className="alert alert-primary mt-3 text-center"
                                        role="alert"
                                        style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <p>{responseMessage.message}</p>
                                        <hr />
                                        {responseMessage.verdict.includes('http') ? (
                                            <a
                                                href={responseMessage.verdict}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    textDecoration: 'underline',
                                                    color: '#1e88e5',
                                                }}
                                            >
                                                Link
                                            </a>
                                        ) : (
                                            <VerdictBadge verdict={responseMessage.verdict} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="w-100 py-3"
                        style={{
                            background: "linear-gradient(90deg, #ff7043, #43a047)",
                            color: "#fff",
                            boxShadow: "0px 4px 12px rgba(255, 112, 67, 0.3)",
                        }}
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
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

export default RunRandomTestCaseCodeModal;
