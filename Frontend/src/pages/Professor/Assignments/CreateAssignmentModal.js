import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import CreateAssignmentNavtabs from "./CreateAssignmentNavtabs";
import { fetchData } from "../../../Scripts/Axios";

function CreateAssignmentModal() {
    const [showModal, setShowModal] = useState(false);
    const [Batches, setBatches] = useState([]);
    const [MyQuestions, setMyQuestions] = useState([]);
    const [OtherQuestions, setOtherQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    fetchData("/getBatches", setBatches, "Batches", "Error while fetching Batches"),
                    fetchData("/professors/getMyQuestions", setMyQuestions, "Questions", "Error while fetching MyQuestions"),
                    fetchData("/professors/getOtherQuestions", setOtherQuestions, "Questions", "Error while fetching OtherQuestions")
                ]);
                setLoading(false); // Data loaded successfully
            } catch (err) {
                setError("Error fetching data");
                setLoading(false); // Stop loading even in case of error
            }
        };

        fetchAllData();
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <>
            <Button
                variant="primary"
                className="w-100"
                onClick={toggleModal}
                style={{
                    background: "linear-gradient(90deg, #1e88e5, #43a047)",
                    color: "#fff",
                    boxShadow: "0px 5px 10px rgba(30, 136, 229, 0.3)",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                }}
            >
                Create Assignment
            </Button>

            <Modal show={showModal} onHide={toggleModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            color: "#1e88e5", 
                            textShadow: "0px 4px 15px rgba(30, 136, 229, 0.3)"
                        }}
                    >
                        Create Assignment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
                        color: "#333",
                        minHeight: "80vh",
                    }}
                >
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                    <CreateAssignmentNavtabs
                        activeTab="OverviewTab"
                        Batches={Batches}
                        MyQuestions={MyQuestions}
                        OtherQuestions={OtherQuestions}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={toggleModal}
                        style={{
                            background: "linear-gradient(90deg, #43a047, #1e88e5)",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateAssignmentModal;
