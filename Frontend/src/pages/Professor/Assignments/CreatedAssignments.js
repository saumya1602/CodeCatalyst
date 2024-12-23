import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { convertIsoToNormalTime, getTimeElapsed } from '../../../Scripts/TimeFunctions';
import AssignmentListSkeleton from '../../../components/Skeletons/AssignmentListSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import DeleteAssignmentConfirmationModal from '../../../components/Modal/DeleteAssignmentConfirmationModal';
import { fetchData, DeleteData } from '../../../Scripts/Axios';

// This returns a list of assignments created by this professor
function CreatedAssignments() {
  const [MyCreatedAssignments, setMyCreatedAssignments] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentIdToDelete, setAssignmentIdToDelete] = useState(null);

  useEffect(() => {
    fetchData(
      "/professors/myAssignments",
      setMyCreatedAssignments,
      "Assignments",
      "An error occurred while fetching my created assignments"
    );
  }, []);

  const handleDeleteAssignment = async () => {
    toast.info(`Deleting assignment with id: ${assignmentIdToDelete}`);
    await DeleteData(`/professors/deleteAssignment/${assignmentIdToDelete}`, 
      "An error occurred while deleting the assignment", 
      () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    );
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); // Close the modal
    setAssignmentIdToDelete(null); // Reset the assignmentIdToDelete
  };

  const handleShowModal = (id) => {
    setShowDeleteModal(true);
    setAssignmentIdToDelete(id);
  };

  if (MyCreatedAssignments === null) {
    return <AssignmentListSkeleton count={1} />;
  }

  return (
    <>
      {MyCreatedAssignments.length === 0 ? (
        <h3>No Assignments Created Yet</h3>
      ) : (
        MyCreatedAssignments.map((assignment, index) => (
          <div key={index} className="card my-3">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5
                className="text-center mb-0 flex-grow-1"
                style={{ fontSize: '16px' }}
              >
                {assignment.AssignmentName}
              </h5>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleShowModal(assignment._id)}
                style={{
                  background: 'linear-gradient(90deg, #1e88e5, #43a047)',
                  border: 'none',
                  boxShadow: '0px 5px 10px rgba(30, 136, 229, 0.3)',
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <div className="card-body">
              <div>
                <p className="card-text">
                  <strong>Posted On:</strong>{' '}
                  {convertIsoToNormalTime(assignment.PostedOn).date}{' '}
                  {convertIsoToNormalTime(assignment.PostedOn).time}{' '}
                  <span className="text-muted">
                    [ {getTimeElapsed(assignment.PostedOn)} ]
                  </span>
                </p>
                <p className="card-text">
                  <strong>Due Timestamp:</strong>{' '}
                  {convertIsoToNormalTime(assignment.DueTimestamp).date}{' '}
                  {convertIsoToNormalTime(assignment.DueTimestamp).time}{' '}
                  <span className="text-muted">
                    [ {getTimeElapsed(assignment.DueTimestamp)} ]
                  </span>
                </p>
                <p className="card-text">
                  <strong>Batches:</strong>{' '}
                  {assignment.Batches.map((batch, batchIndex) => (
                    <span key={batchIndex} className="badge bg-secondary mx-1">
                      {batch}
                    </span>
                  ))}
                </p>
                <p className="card-text">
                  <strong>Year:</strong>{' '}
                  <span className="badge bg-success mx-1">
                    {assignment.Year}
                  </span>
                </p>
                <p className="card-text">
                  <strong>AI Assistance:</strong>{' '}
                  <span
                    className={`badge mx-1 ${
                      assignment.AIAssistance ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {assignment.AIAssistance ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  size="sm"
                  style={{
                    background: 'linear-gradient(90deg, #1e88e5, #43a047)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  Questions ({assignment.Questions.length})
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {assignment.Questions.map((questionid, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() =>
                        (window.location.href = `/Question/Full/${questionid}`)
                      }
                    >
                      Question {index + 1}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <a
                className="btn btn-primary btn-sm d-block d-sm-inline-block"
                href={`/professors/submissions/${assignment.AssignmentName}/${assignment._id}`}
                style={{
                  background: 'linear-gradient(90deg, #1e88e5, #43a047)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0px 5px 10px rgba(30, 136, 229, 0.3)',
                }}
              >
                Submissions ({assignment.SubmittedBy.length})
              </a>
            </div>
          </div>
        ))
      )}
      <DeleteAssignmentConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        Label={'This Assignment'}
        handleDelete={handleDeleteAssignment}
      />
    </>
  );
}

export default CreatedAssignments;
