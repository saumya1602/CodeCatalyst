import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import QuestionListSkeleton from '../../../components/Skeletons/QuestionsListSkeleton';
import DeleteQuestionConfirmationModal from '../../../components/Modal/DeleteQuestionConfirmationModal';
import { deleteAPI, fetchData } from '../../../Scripts/Axios';

function QuestionsList({ apiRoute, type }) {
    const [Questions, setQuestions] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [nameOfQuestionSelectedToDelete, setNameOfQuestionSelectedToDelete] = useState(null);
    const [includedInAssignmentsArray, setIncludedInAssignmentsArray] = useState([]);
    const [DeleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData(apiRoute, setQuestions, "Questions", "Error while fetching Questions");
    }, [apiRoute]); // Add apiRoute as dependency to re-fetch data if it changes

    const DeleteButtonPressed = async (curQuestionName, deleteId) => {
        setNameOfQuestionSelectedToDelete(curQuestionName);
        setDeleteId(deleteId);
        setShowConfirmationModal(true);
    }

    const CloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setDeleteId(null);
        setIncludedInAssignmentsArray([]);
        setNameOfQuestionSelectedToDelete(null);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteAPI(`/professors/deleteQuestion/${DeleteId}`); // Fixed API route string
            const { success, assignments, message } = response.data;
            if (success) {
                toast.success(message);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                if (assignments) {
                    setIncludedInAssignmentsArray(assignments);
                    toast.info(message);
                } else {
                    toast.error(message);
                }
            }
        }
        catch (err) {
            toast.error(`Error while deleting Question, error ${err.message}`); // Fixed error message
        }
    }

    return (
        <>
            {Questions === null ? (
                <QuestionListSkeleton count={3} />
            ) : Questions.length === 0 ? (
                <p style={{ color: "white" }} className='text-center'>No Questions</p>
            ) : (
                <>
                    <ListGroup>
                        <hr />
                        <div className='container'>
                            {type === "MyQuestions" ? (
                                Questions.map((question, index) => (
                                    <div className="row" key={index}>
                                        <div className="col py-0 my-1">
                                            <ListGroup.Item
                                                action
                                                className="d-flex justify-content-between align-items-center mb-2 rounded h-fit"
                                                onClick={() => window.location.href = `/Question/Full/${question._id}`}
                                                style={{
                                                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
                                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                                }}
                                            >
                                                <div className="d-flex justify-content-end align-items-center" style={{ height: "25px" }}>
                                                    {question.QuestionName}
                                                </div>
                                            </ListGroup.Item>
                                        </div>
                                        <div className="col-auto p-0 my-1 mx-2 d-flex justify-content-center align-items-center">
                                            <ListGroup.Item
                                                action
                                                className="d-flex justify-content-between align-items-center mb-2 rounded h-fit"
                                                onClick={() => { window.location.href = `/professors/EditQuestion/${question._id}` }}
                                                style={{
                                                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
                                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                                }}
                                            >
                                                <div className="d-flex justify-content-end align-items-center" style={{ height: "25px" }}>
                                                    <FontAwesomeIcon icon={faEdit} className='mx-1' />
                                                </div>
                                            </ListGroup.Item>
                                        </div>
                                        <div className="col-auto p-0 my-1 d-flex justify-content-center align-items-center">
                                            <ListGroup.Item
                                                action
                                                className="d-flex justify-content-between align-items-center mb-2 rounded h-fit"
                                                onClick={() => DeleteButtonPressed(question.QuestionName, question._id)}
                                                style={{
                                                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
                                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                                }}
                                            >
                                                <div className="d-flex justify-content-end align-items-center" style={{ height: "25px" }}>
                                                    <FontAwesomeIcon icon={faTrash} className='mx-1' />
                                                </div>
                                            </ListGroup.Item>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                Questions.map((question, index) => (
                                    <div className="row" key={index}>
                                        <div className="col py-0 my-1">
                                            <ListGroup.Item
                                                action
                                                className="d-flex justify-content-between align-items-center mb-2 rounded h-fit"
                                                onClick={() => window.location.href = `/Question/Full/${question._id}`}
                                                style={{
                                                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)", // Light gradient background
                                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                                }}
                                            >
                                                <div className="d-flex justify-content-end align-items-center" style={{ height: "25px" }}>
                                                    {question.QuestionName}
                                                </div>
                                            </ListGroup.Item>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <hr />
                    </ListGroup>
                    <DeleteQuestionConfirmationModal
                        show={showConfirmationModal}
                        handleClose={CloseConfirmationModal}
                        handleDelete={handleDelete}
                        Label={nameOfQuestionSelectedToDelete}
                        includedInAssignmentsArray={includedInAssignmentsArray}
                    />
                </>
            )}
        </>
    );
}

export default QuestionsList;
