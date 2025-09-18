import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../../components/Navbar2';

const Donour = () => {
  const [activeButton, setActiveButton] = useState('donour');
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    itemType: '',
    customItem: '',
    itemCondition: '',
    conditionStatus: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      itemType: value,
      customItem: value !== 'other' ? '' : prev.customItem
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.donorName || !formData.donorEmail || !formData.itemType || 
        !formData.itemCondition || !formData.conditionStatus || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.itemType === 'other' && !formData.customItem) {
      alert('Please specify the custom item');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you'd upload the image first and get a URL
      // For now, we'll use a placeholder or the file name
      const imageUrl = selectedFile ? `uploads/${selectedFile.name}` : null;

      const donationData = {
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        itemType: formData.itemType,
        customItem: formData.itemType === 'other' ? formData.customItem : undefined,
        itemCondition: formData.itemCondition,
        conditionStatus: formData.conditionStatus,
        description: formData.description,
        imageUrl: imageUrl
      };

      const response = await fetch('https://donourly-backend.onrender.com/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Donation posted successfully! It will now appear in the receivers feed.');
        // Reset form
        setFormData({
          donorName: '',
          donorEmail: '',
          itemType: '',
          customItem: '',
          itemCondition: '',
          conditionStatus: '',
          description: ''
        });
        setSelectedFile(null);
        navigate('/#options');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              placeholder="Enter your Name" 
              required
            />
            <InputField 
              type="email" 
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleInputChange}
              placeholder="Enter your E-Mail" 
              required
            />
          </FormRow>

          <FormRow>
            <SelectField 
              name="itemType"
              value={formData.itemType} 
              onChange={handleItemChange}
              required
            >
              <option value="" disabled>
                Type of Item
              </option>
              <option value="clothes">Clothes</option>
              <option value="food">Non-perishable Food</option>
              <option value="water">Packaged Water</option>
              <option value="toiletries">Toiletries</option>
              <option value="blankets">Blankets</option>
              <option value="stationery">Stationery / School Supplies</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="medicines">Basic Medicines / First Aid</option>
              <option value="toys">Toys</option>
              <option value="shoes">Shoes / Footwear</option>
              <option value="other">Other</option>
            </SelectField>

            <SelectField 
              name="itemCondition"
              value={formData.itemCondition}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Item Condition
              </option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </SelectField>
          </FormRow>

          {formData.itemType === 'other' && (
            <FormRow>
              <InputField
                type="text"
                name="customItem"
                placeholder="Please specify the item"
                value={formData.customItem}
                onChange={handleInputChange}
                required
              />
            </FormRow>
          )}

          <FormRow>
            <SelectField 
              name="conditionStatus"
              value={formData.conditionStatus}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Condition Status
              </option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </SelectField>

            <UploadWrapper>
              <UploadButton
                type="button"
                onClick={() =>
                  document.getElementById('fileInput')?.click()
                }
              >
                {selectedFile ? selectedFile.name : 'Upload an Image'}{' '}
                <PlusSign>+</PlusSign>
              </UploadButton>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </UploadWrapper>
          </FormRow>

          <DescriptionField 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Briefly describe the item, its purpose, or any notes" 
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
  margin-top: 17rem;
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
  gap: 2rem;
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
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #000;
  outline: none;

  &::placeholder {
    color: #777;
  }

  &:focus {
    border-color: #03045e;
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
  }
`;

const SelectField = styled.select`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #000;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #03045e;
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
  }

  option {
    color: #000;
  }
`;

const UploadWrapper = styled.div`
  flex: 1;
`;

const UploadButton = styled.button`
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #03045e;
  padding: 12px 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #03045e;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #edf2f7;
  }
`;

const PlusSign = styled.span`
  font-weight: 900;
  font-size: 1.3rem;
`;

const DescriptionField = styled.textarea`
  width: 96%;
  min-height: 120px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 14px 18px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #000;
  resize: none;
  outline: none;

  &::placeholder {
    color: #777;
  }

  &:focus {
    border-color: #03045e;
    box-shadow: 0 0 0 2px rgba(3, 4, 94, 0.15);
  }
`;

const SubmitButton = styled.button`
  max-width: 160px;
  align-self: center;
  background: #0088ff;
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

export default Donour;
