import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

const Signup: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Signup submitted with:', { name, email, password, confirmPassword });
    // Add your signup logic here
  };

  return (
    <Container>
      <LeftContent>
        {/* Container 1: DONOURLY Logo & Text */}
        <LogoContainer>
          <Logo src="assets/DONOURLY/logo.png" alt="DONOURLY Logo" />
          <StyledLogoText to="/">DONOURLY</StyledLogoText> {/* Using the new StyledLogoText */}
        </LogoContainer>

        {/* Container 2: Welcome Text - Now using a group container */}
        <WelcomeGroup>
          <WelcomeText>Welcome</WelcomeText>
          <WelcomeText2>To our special space</WelcomeText2>
        </WelcomeGroup>

        {/* Container 3: Input Fields & Button */}
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={handleNameChange}
          />
          <Input
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <LogInButton type="submit">Sign Up</LogInButton>
        </LoginForm>

        {/* Container 4: 'Already have an account?' Text */}
        <FooterTextContainer>
          <SignUpText>
            Already have an account? <SignUpLink to="/login">Log In</SignUpLink>
          </SignUpText>
        </FooterTextContainer>
      </LeftContent>

      <IllustrationContainer>
        <Illustration src="assets/Icons/Signup.png" alt="Signup Illustration" />
      </IllustrationContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  justify-content: space-around;
  padding: 0 50px;
  font-family: poppins;
  background-color: white;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
`;

const WelcomeGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  gap: 0px;
`;

const FooterTextContainer = styled.div`
  margin-top: 60px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

// Corrected LogoText to style the Link component
const StyledLogoText = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none; /* Remove underline from Link */
`;

const WelcomeText = styled.h2`
  font-size: 64px;
  font-weight: 550;
  color: #000;
  margin: 0;
`;

const WelcomeText2 = styled.h2`
  font-size: 24px;
  font-weight: 50;
  color: #333;
  margin: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  font-size:5px;
`;

const Input = styled.input`
  width: 100%; 
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #ffc107;
  }
`;

const LogInButton = styled.button`
  background-color: #d3a001;
  margin-top:30px;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  width:150px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a800;
  }
`;

const SignUpText = styled.p`
  font-size: 16px;
  color: #555;
`;

const SignUpLink = styled(Link)`
  color: #d3a001;
  cursor: pointer;
  font-weight: semi-bold;
  text-decoration: none;
`;

const IllustrationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Illustration = styled.img`
  max-width: 500px;
  height: auto;
`;

export default Signup;