import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PlainNavbar from '../../components/Navbar/PlainNavbar';
import RightsReservedFooter from '../../components/Footer/RightsReservedFooter';
import LoginForm from './LoginForm';
import LoadingSpinner from '../../components/Spinners/Spinners';
import { fetchAPI } from '../../Scripts/Axios';

function LoginPage({ LoginType }) {
  const [formData, setFormData] = useState({
    Institution: '',
    Username: '',
    Password: '',
    LoginType: LoginType
  });

  const [Institutions, setInstitutions] = useState(null);

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post('/login', formData, { withCredentials: true });
      console.log(response.data);
      if (!response.data.success)
        toast.error(response.data.message);
      else {
        toast.success(response.data.message);
        localStorage.setItem(`${LoginType}Login`, true);
        window.location.href = `/${LoginType.toLowerCase()}/assignments`;
      }
    } catch (error) {
      toast.error(`Error while Submitting Form: ${error}`);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Fetching Institutions
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetchAPI('/registeredColleges');
        setInstitutions(response.data.result);
      } catch (error) {
        toast.error(`Error fetching Institution. Please try again later. err: ${error}`);
      }
    };

    fetchInstitutions();
  }, []);

  // Redirect to Assignments Page if already logged in
  if (localStorage.getItem(`${LoginType}Login`) === 'true') {
    window.location.href = `/${LoginType.toLowerCase()}/assignments`;
  }

  if (Institutions) {
    return (
      <>
        <PlainNavbar />
        <div className="d-flex justify-content-center align-items-center" style={pageContainerStyle}>
          <div className="card align-items-center" style={cardStyle}>
            <div className="card-body" style={{ width: '100%', maxWidth: '500px' }}>
              <h5 className="card-title mb-4 text-center" style={titleStyle}>{LoginType} LOGIN</h5>
              <LoginForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} Institutions={Institutions} />
            </div>
          </div>
        </div>
        {/* <RightsReservedFooter /> */}
      </>
    );
  } else {
    return (
      <LoadingSpinner />
    );
  }
}

const pageContainerStyle = {
  minHeight: '80vh',
  background: 'linear-gradient(135deg, #ffffff, #f0f4f8)', // Light gradient background
  color: '#333',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  color: '#333',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 8px 20px rgba(30, 136, 229, 0.1)',
  width: '100%',
  maxWidth: '600px',
};

const titleStyle = {
  fontFamily: 'Arial, sans-serif',
  color: '#1e88e5', // Bright blue title color
  textShadow: '0px 4px 10px rgba(30, 136, 229, 0.3)', // Light glow effect
};

export default LoginPage;
