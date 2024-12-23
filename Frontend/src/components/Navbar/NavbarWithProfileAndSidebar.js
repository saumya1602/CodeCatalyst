import { fetchAPI } from '../../Scripts/Axios';
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from '../Modal/profileModal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function NavbarWithProfileAndSidebar({ TabNames = [], TabLinks = [], ActiveTabIndex = 0 }) {
    const [showModal, setShowModal] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
                    {/* only show this offcanvas if TabNames.length is not zero */}
                    {TabNames.length !== 0 ? (
                        <>
                            <Navbar.Brand variant="primary" onClick={handleShow}>
                                <FontAwesomeIcon icon={faBars} style={{ cursor: 'pointer', color: '#1e88e5' }} />
                            </Navbar.Brand>
                            <Offcanvas show={show} onHide={handleClose} className="bg-light text-dark">
                                <Offcanvas.Header closeButton className="border-bottom border-dark">
                                    <Offcanvas.Title className="text-dark">CodeSphere</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        {/* iterate over tabnames and tablinks */}
                                        {TabNames.map((tab, index) => (
                                            <li key={index} className="nav-item">
                                                {/* make only the `ActiveTabIndex` active */}
                                                <a href={TabLinks[index]} className={`nav-link ${index === ActiveTabIndex ? 'active' : ''}`} style={{ fontSize: '19px' }} aria-current="page">{tab}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </>
                    ) : (
                        <Navbar.Brand variant="primary" onClick={handleShow}>
                            <FontAwesomeIcon icon={faCode} style={{ color: '#1e88e5' }} />
                        </Navbar.Brand>
                    )}
                    <FontAwesomeIcon
                        icon={faUser}
                        onClick={handlesShowProfileModal}
                        style={{
                            cursor: 'pointer',
                            color: '#1e88e5',
                            border: '1px solid #1e88e5',
                            padding: '5px',
                            borderRadius: '50%',
                            boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.3)',
                        }}
                    />
                </Container>
            </Navbar>
            <ProfileModal show={showModal} onHide={() => setShowModal(false)} profileData={profileData} />
        </>
    );
}

export default NavbarWithProfileAndSidebar;
