import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection, useActiveSection } from '../hooks/useParallax';

interface Props {}

const ParallaxNavbar: React.FC<Props> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const navbarY = useTransform(scrollYProgress, [0, 0.1], [0, -5]);
  
  const sections = ['home', 'about', 'whomwehelp', 'options', 'contact'];
  const activeSection = useActiveSection(sections);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <NavbarContainer
      as={motion.nav}
      style={{ y: navbarY }}
      $isScrolled={isScrolled}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <NavbarContent>
        <Logo
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavClick('home')}
        >
          <LogoImage src="assets/logo.png" alt="Donourly" />
          <LogoText>Donourly</LogoText>
        </Logo>

        <NavLinks>
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'whomwehelp', label: 'Whom We Help' },
            { id: 'options', label: 'Get Started' },
            { id: 'contact', label: 'Contact' }
          ].map((link, index) => (
            <NavLink
              key={link.id}
              as={motion.button}
              $isActive={activeSection === link.id}
              onClick={() => handleNavClick(link.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {activeSection === link.id && (
                <ActiveIndicator
                  as={motion.div}
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          ))}
        </NavLinks>

        <ActionButtons>
          <LoginButton
            as={motion.a}
            href="/login"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </LoginButton>
          
          <SignupButton
            as={motion.a}
            href="/signup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </SignupButton>
        </ActionButtons>
      </NavbarContent>

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        as={motion.div}
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "0%" 
        }}
      />
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  
  background: ${props => props.$isScrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(${props => props.$isScrolled ? '20px' : '10px'});
  box-shadow: ${props => props.$isScrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
    : 'none'};
  border-bottom: 1px solid ${props => props.$isScrolled 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.2)'};
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isActive ? '#000' : '#666'};
  font-size: 16px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  font-family: 'Poppins', sans-serif;
  
  &:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #000;
  border-radius: 1px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LoginButton = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  
  &:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const SignupButton = styled.a`
  background: #000;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: #333;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ScrollProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0088FF 0%, #FDC726 100%);
  transform-origin: 0%;
`;

export default ParallaxNavbar;