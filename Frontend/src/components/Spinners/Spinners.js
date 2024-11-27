import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return (
        <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 9999 }}>
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <Spinner 
                    animation="border" 
                    style={{
                        width: '5rem', 
                        height: '5rem', 
                        borderTopColor: '#1e88e5', // Bright blue color for the spinner animation
                        borderRightColor: '#43a047', // Green for contrast
                        borderLeftColor: '#1e88e5', 
                        borderBottomColor: '#43a047', 
                    }} 
                />
            </div>
        </div>
    );
}

export default LoadingSpinner;
