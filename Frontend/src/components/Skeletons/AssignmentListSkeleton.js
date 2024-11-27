import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import 'react-loading-skeleton/dist/skeleton.css'

function AssignmentListSkeleton({ count }) {
    // Create an array with count elements to map over
    const skeletonArray = Array.from({ length: count }, (_, index) => index);

    return (
        <div>
            {skeletonArray.map((index) => (
                <div key={index} className="row my-3 w-100">
                    <div className="col">
                        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f0f4f8)', borderRadius: '15px' }}>
                            <div className="card-header d-flex align-items-center" style={{ background: 'linear-gradient(90deg, #1e88e5, #43a047)', color: '#fff', borderRadius: '15px 15px 0 0' }}>
                                <small className="text-muted" style={{ color: '#f0f4f8' }}>Posted By: <Skeleton width={50} /></small>
                                <h5 className="text-center mb-0 flex-grow-1"><Skeleton width={50} /></h5>
                            </div>
                            <div className="card-body" style={{ background: '#f9f9f9' }}>
                                <div>
                                    <p className="card-text">
                                        <strong>Posted On:</strong>{" "}
                                        <Skeleton width={150} />{" "}
                                    </p>
                                    <p className="card-text">
                                        <strong>Due Timestamp:</strong>{" "}
                                        <Skeleton width={50} />{" "}
                                    </p>
                                    <p className="card-text">
                                        <strong>Batches:</strong>{" "}
                                        <Skeleton width={50} />
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between" style={{ background: 'linear-gradient(90deg, #1e88e5, #43a047)', borderRadius: '0 0 15px 15px' }}>
                                <button className="btn btn-light btn-sm d-block d-sm-inline-block" style={{ borderRadius: '30px', boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.4)' }}> Questions </button>
                                <button className="btn btn-light btn-sm d-block d-sm-inline-block" style={{ borderRadius: '30px', boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.4)' }}> Submissions </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AssignmentListSkeleton;
