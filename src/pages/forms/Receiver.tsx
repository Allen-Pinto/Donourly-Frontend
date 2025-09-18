import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar2 from '../../components/Navbar2';

const Receiver = () => {
  const [activeButton, setActiveButton] = useState('receiver');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    stateCity: '',
    address: '',
    whoAreYou: '',
    atgForm: null as File | null,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get donation ID from navigation state (passed when "Receive Now" is clicked)
  const donationId = location.state?.donationId;

  const handleBackClick = () => {
    navigate('/#options');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        atgForm: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationId) {
      alert('No donation selected. Please go back and select a donation first.');
      return;
    }

    // Validation
    if (!formData.name || !formData.email || !formData.location || !formData.stateCity || 
        !formData.address || !formData.whoAreYou || !formData.atgForm || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you'd upload the ATG form first and get a URL
      const atgFormUrl = formData.atgForm ? `uploads/atg-forms/${formData.atgForm.name}` : '';

      const receiverData = {
        name: formData.name,
        email: formData.email,
        location: formData.location,
        stateCity: formData.stateCity,
        address: formData.address,
        whoAreYou: formData.whoAreYou,
        atgFormUrl: atgFormUrl,
        description: formData.description,
        donationId: donationId
      };

      const response = await fetch('https://donourly-backend.onrender.com/api/receivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiverData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Successfully received the donation! The donor will be notified with your details.');
        navigate('/#options');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting receiver form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!donationId) {
    return (
      <>
        <Navbar2 />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>No Donation Selected</h2>
          <p>Please go back and select a donation first.</p>
          <button onClick={() => navigate('/#options')}>Go Back</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      <TopBar>
        <BackButton onClick={handleBackClick}>
          <span>Back</span>
        </BackButton>
      </TopBar>
      <StyledWrapper>
        <FormContainer onSubmit={handleSubmit}>
          <FormRow>
            <InputField 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your Name" 
              required
            />
            <InputField 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your E-Mail" 
              required
            />
          </FormRow>
          <FormRow>
            <InputField 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location" 
              required
            />
            <InputField 
              name="stateCity"
              value={formData.stateCity}
              onChange={handleInputChange}
              placeholder="State/City" 
              required
            />
          </FormRow>
          <FormRow>
            <InputField 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address" 
              required
            />
            <SelectField 
              name="whoAreYou"
              value={formData.whoAreYou}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Who are You?
              </option>
              <option value="ngo">NGO</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </SelectField>
          </FormRow>
          <FormRow>
            <UploadButton as="label">
              {formData.atgForm ? formData.atgForm.name : 'Upload ATG form'} <PlusSign>+</PlusSign>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
              />
            </UploadButton>
          </FormRow>
          <DescriptionField 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Briefly describe about your NGO, organisation etc" 
            required
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </SubmitButton>
        </FormContainer>
      </StyledWrapper>
    </>
  );
};

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  max-width: 1100px;
  margin: 10px auto 1rem;
  padding: 0 1rem;
  margin-right: 10rem;
`;

const BackButton = styled.button`
  display: inline-block;
  width: 140px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #03045e;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in;
  z-index: 1;
  background: transparent;
  cursor: pointer;
  margin-top: 17.6rem;
  margin-right: 4.5rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    transform: skew(15deg);
    transition: all 0.5s;
    overflow: hidden;
    z-index: -1;
  }

  &::before {
    left: -10px;
    background: #00213e;
  }

  &::after {
    right: -10px;
    background: black;
  }

  &:hover::before,
  &:hover::after {
    width: 58%;
  }

  span {
    color: #03045e;
    font-size: 18px;
    transition: all 0.3s ease-in;
  }

  &:hover span {
    color: white;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/assets/form.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.09;
    z-index: -1;
  }
`;

const FormContainer = styled.form`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background: #fff;
  border-radius: 17px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 60rem;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const InputField = styled.input`
  flex: 1;
  background: #fff;
  border-radius: 9999px; /* to achieve pill shape as seen in screenshot */
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #000;
  outline: none;
  box-shadow: 0 0 0 1px #ddd;

  &::placeholder {
    color: #777;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
    border: none;
  }
`;

const SelectField = styled.select`
  flex: 1;
  background: #fff;
  border-radius: 9999px; /* pill shape */
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #000;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ddd;

  &:focus {
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
    border: none;
  }

  option {
    color: #000;
  }
`;

const UploadButton = styled.button`
  flex: 1;
  background: #fff;
  border-radius: 9999px; /* pill shape */
  border: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  padding: 12px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }
`;

const PlusSign = styled.span`
  font-weight: 900;
  font-size: 1.3rem;
  user-select: none;
`;

const DescriptionField = styled.textarea`
  width: 93%;
  min-height: 120px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 24px 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: #000;
  resize: none;
  outline: none;
  font-weight: 300;

  &::placeholder {
    color: #777;
    font-weight: 300;
    font-family: 'Poppins', sans-serif;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
    border: none;
  }
`;

const SubmitButton = styled.button`
  max-width: 160px;
  align-self: center;
  background: #FDC726;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in;

  &:hover {
    background: black;
  }
`;

export default Receiver;
