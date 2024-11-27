import PlainNavbar from "../../components/Navbar/PlainNavbar";
import RegisterCollegeForm from "./RegisterCollegeForm";
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

function RegisterCollege() {
  const [formData, setFormData] = useState({
    CollegeName: '',
    Name: '',
    Email: '',
    PhoneNo: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      let response = await axios.post('/registerCollege', formData, { withCredentials: true });
      console.log(response.data);
      if (!response.data.success)
        toast.error(response.data.message);
      else {
        toast.success(response.data.message);
        // Clear the form UI
        setFormData({
          CollegeName: '',
          Name: '',
          Email: '',
          PhoneNo: ''
        });
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

  return (
    <>
      <PlainNavbar />
      <div className="d-flex justify-content-center align-items-center" style={backgroundStyle}>
        <div className="card align-items-center" style={cardStyle}>
          <div className="card-body" style={{ width: '100%', maxWidth: '500px' }}>
            <h5 className="card-title mb-4 text-center" style={titleStyle}>Register Your College</h5>
            <RegisterCollegeForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
          </div>
        </div>
      </div>
      {/* <RightsReservedFooter /> */}
      <style jsx>{`
        .form-control {
          background-color: #ffffff;
          color: #333;
          border: 1px solid #ccc;
        }
        .form-control:focus {
          background-color: #f5f5f5;
          border-color: #1e88e5;
          box-shadow: 0 0 8px rgba(30, 136, 229, 0.5);
        }
        .btn-primary {
          background: linear-gradient(90deg, #1e88e5, #43a047);
          border: none;
          color: white;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #43a047, #1e88e5);
        }
        .card {
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}

const backgroundStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #ffffff, #f0f4f8)', // Light gradient
  color: '#333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  color: '#333',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
};

const titleStyle = {
  fontFamily: 'Arial, sans-serif',
  color: '#1e88e5',
  textShadow: '0px 4px 10px rgba(30, 136, 229, 0.3)',
};

export default RegisterCollege;

