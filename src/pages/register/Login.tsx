import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login submitted with:', { email, password });
    // Add your login logic here
  };

  return (
    <Container>
      <LeftContent>
        {/* Container 1: DONOURLY Logo & Text */}
        <LogoContainer>
          <Logo src="assets/DONOURLY/logo.png" alt="DONOURLY Logo" />
          <StyledLogoText to="/">DONOURLY</StyledLogoText> {/* Changed to StyledLogoText */}
        </LogoContainer>

        {/* Container 2: Welcome Text */}
        <WelcomeGroup>
          <WelcomeText>Welcome</WelcomeText>
          <WelcomeText2>Back</WelcomeText2>
        </WelcomeGroup>

        {/* Container 3: Input Fields & Button */}
        <LoginForm onSubmit={handleSubmit}>
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
          <ForgotPassword>Forgot Password?</ForgotPassword>
          <LogInButton type="submit">Log In</LogInButton>
        </LoginForm>

        {/* Container 4: 'Don't have an account?' Text */}
        <FooterTextContainer>
          <SignUpText>
            Don't have an account? <SignUpLink to="/Signup">Sign Up</SignUpLink>
          </SignUpText>
        </FooterTextContainer>
      </LeftContent>

      <IllustrationContainer>
        <Illustration src="assets/Icons/Login.png" alt="Login Illustration" />
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
  font-family: 'Poppins', sans-serif;
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
  margin-bottom: 30px;
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
  font-size: 48px;
  font-weight: 550;
  color: #000;
  margin: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
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

const ForgotPassword = styled.p`
  font-size: 14px;
  color: #8f8f8f;
  text-align: right;
  margin-bottom: 15px;
  cursor: pointer;
`;

const LogInButton = styled.button`
  background-color: #d3a001;
  margin-top: 30px;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  width: 150px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d3a001;
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

export default Login;