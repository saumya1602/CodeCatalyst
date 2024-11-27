import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from '../Modal/profileModal';
import { toast } from 'react-toastify';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import SubmitAssignmentModal from '../Modal/SubmitAssignmentModal';
import { fetchAPI }  from '../../Scripts/Axios';

function SubmitAssignmentNavbar({ _id, UserCodes }) {
    const [showModal, setShowModal] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handlesShowProfileModal = async () => {
        try {
            const response = await fetchAPI('/getProfile');
            console.log(response.data);
            if (response.data.success === false) {
                toast.error(response.data.message);
                return;
            }
            else {
                setProfileData(response.data.profile);
            }
            setShowModal(true);
        } catch (err) {
            toast.error(`Error fetching Profile: ${err}`);
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Container fluid className="px-3">
                    {
                        <Navbar.Brand variant="primary" onClick={handleShow}>
                            <FontAwesomeIcon icon={faCode} style={{ color: '#1e88e5' }} />
                        </Navbar.Brand>
                    }
                    <SubmitAssignmentModal _id={_id} UserCodes={UserCodes} />
                    <FontAwesomeIcon 
                        icon={faUser} 
                        onClick={handlesShowProfileModal} 
                        style={{
                            cursor: 'pointer', 
                            color: '#1e88e5', 
                            border: '1px solid #1e88e5', 
                            padding: '5px', 
                            borderRadius: '50%',
                            boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.3)'
                        }} 
                    />
                </Container>
            </Navbar>
            <ProfileModal show={showModal} onHide={() => setShowModal(false)} profileData={profileData} />
        </>
    );
}

export default SubmitAssignmentNavbar;
