import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../../components/Navbar2";

const Ask = () => {
  const [activeButton, setActiveButton] = useState("ask");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemType: "",
    quantity: "",
    customQuantity: "",
    urgency: "",
    govtId: null as File | null,
    description: "",
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/#options");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, govtId: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ask Form Data:", formData);
    alert("Form submitted! Check console for data.");
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
          {/* Row 1 */}
          <FormRow>
            <InputField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              required
            />
            <InputField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your E-Mail"
              required
            />
          </FormRow>

          {/* Row 2 */}
          <FormRow>
            <SelectField
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Type of Item
              </option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Medicine">Medicine</option>
              <option value="Money">Money</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </SelectField>

            <SelectField
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Quantity
              </option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20+">20+</option>
              <option value="custom">Other (Specify)</option>
            </SelectField>
          </FormRow>

          {/* Custom quantity input (only when "custom" is chosen) */}
          {formData.quantity === "custom" && (
            <FormRow>
              <InputField
                type="number"
                name="customQuantity"
                value={formData.customQuantity}
                onChange={handleChange}
                placeholder="Enter exact quantity"
                min="1"
                required
              />
            </FormRow>
          )}

          {/* Row 3 */}
          <FormRow>
            <SelectField
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Urgency
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </SelectField>

            <UploadButton as="label">
              {formData.govtId ? formData.govtId.name : "Upload any Govt ID"}{" "}
              <PlusSign>+</PlusSign>
              <input
                type="file"
                name="govtId"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
            </UploadButton>
          </FormRow>

          {/* Description */}
          <DescriptionField
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe why you need it?"
            required
          />

          <SubmitButton type="submit">SUBMIT</SubmitButton>
        </FormContainer>
      </StyledWrapper>
    </>
  );
};

/* --- styled components unchanged --- */
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
  gap: 2rem;
  background: white;
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
`;

const UploadButton = styled.button`
  flex: 1;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #03045e;
  padding: 12px 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #03045e;
  font-weight: 500;
  cursor: pointer;
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
`;

const SubmitButton = styled.button`
  max-width: 160px;
  align-self: center;
  background: #9a9b9a;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: black;
  }
`;

export default Ask;
