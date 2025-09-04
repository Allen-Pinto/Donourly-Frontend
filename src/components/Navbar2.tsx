import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Navbar2: React.FC = () => {
  const navigate = useNavigate();

  const handleMemberClick = () => {
    navigate('/signup');
  };

  // Navigate to home page sections
  const handleNavClick = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <NavContainer>
      <NavLeft>
        <StyledLogoLink onClick={handleLogoClick}>
          <Logo src="assets/DONOURLY/logo.png" alt="DONOURLY Logo" />
          <LogoText>DONOURLY</LogoText>
        </StyledLogoLink>
        <StyledNavLink onClick={() => handleNavClick('about')}>About us</StyledNavLink>
        <StyledNavLink onClick={() => handleNavClick('whomwehelp')}>Whom we help</StyledNavLink>
        <StyledNavLink onClick={() => handleNavClick('contact')}>Contact</StyledNavLink>
      </NavLeft>
    </NavContainer>
  );
};

// Navbar styled components with BLACK TEXT (no background color)
const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  box-sizing: border-box;
  z-index: 10;
  /* No background color - transparent like original */
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

// Styled div component to wrap logo and text (clickable)
const StyledLogoLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 25px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: #000; /* BLACK text instead of white */
  cursor: pointer;
  margin: 0;
`;

// Styled button component for nav links
const StyledNavLink = styled.button`
  font-size: 16px;
  color: #000; /* BLACK text instead of white */
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: 500;

  &:hover {
    color: #5f5e5f; 
  }
`;

const NotificationIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  /* No filter - keep original icon colors */
`;

const MemberButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d0cf;
    color: black;
  }
`;

export default Navbar2;