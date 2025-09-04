import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../../components/Navbar3';
import FormNavbar from '../../components/FormNavbar';

const Receiver = () => {
  const [activeButton, setActiveButton] = useState('receiver');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/#options');
  };

  return (
    <>
      <Navbar2 />
      <TopBar>
        <BackButton onClick={handleBackClick}>
          <span>Back</span>
        </BackButton>
        <FormNavbar activeButton={activeButton} onButtonClick={setActiveButton} />
      </TopBar>
      <StyledWrapper>
        <FormContainer>
          <FormRow>
            <InputField type="text" placeholder="Enter your Name" />
            <InputField type="email" placeholder="Enter your E-Mail" />
          </FormRow>
          <FormRow>
            <InputField placeholder="Location" />
            <InputField placeholder="State/City" />
          </FormRow>
          <FormRow>
            <InputField placeholder="Address" />
            <SelectField defaultValue="">
              <option value="" disabled>
                Who are You?
              </option>
              <option value="ngo">NGO</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </SelectField>
          </FormRow>
          <FormRow>
            <UploadButton type="button">
              Upload ATG form <PlusSign>+</PlusSign>
            </UploadButton>
          </FormRow>
          <DescriptionField placeholder="Briefly describe about your NGO, organisation etc" />
          <SubmitButton>SUBMIT</SubmitButton>
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
