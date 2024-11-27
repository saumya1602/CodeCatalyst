import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import 'react-loading-skeleton/dist/skeleton.css'
import { ListGroup } from "react-bootstrap";

function QuestionListSkeleton({ count }) {
    // Create an array with count elements to map over
    const skeletonArray = Array.from({ length: count }, (_, index) => index);

    return (
        <>
            <hr />
            <ListGroup>
                {skeletonArray.map((index) => (
                    <ListGroup.Item action key={index} className="d-flex justify-content-between align-items-center mb-2"
                        style={{
                            background: 'linear-gradient(135deg, #ffffff, #f0f4f8)', // Light gradient background
                            borderRadius: '15px',
                            boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.1)', // Soft shadow effect
                            transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                        }}
                    >
                        <Skeleton width={200} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
        </>
    );
}

export default QuestionListSkeleton;
