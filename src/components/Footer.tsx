import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledFooter = styled.footer`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      transparent 100%);
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FooterLogo = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.9;
`;

const LogoText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
`;

const DeveloperCredit = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .heart {
    color: #ff6b6b;
    font-size: 1rem;
    animation: heartbeat 2s ease-in-out infinite;
  }
  
  .developer-name {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    transition: color 0.3s ease;
    cursor: pointer;
    
    &:hover {
      color: #0088FF;
    }
  }
  
  @keyframes heartbeat {
    0%, 50%, 100% { transform: scale(1); }
    25%, 75% { transform: scale(1.1); }
  }
`;

const Year = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 0.5rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter
      as={motion.footer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <FooterLeft>
        <LogoSection>
          <FooterLogo src="/assets/DONOURLY/1.png" alt="DONOURLY" />
          <LogoText>DONOURLY</LogoText>
        </LogoSection>
        <Divider />
        <Year>© {currentYear}</Year>
      </FooterLeft>

      <FooterRight>
        <DeveloperCredit>
          <span>Made with</span>
          <span className="heart">♥</span>
          <span>by</span>
          <span className="developer-name">Allen Pinto</span>
        </DeveloperCredit>
      </FooterRight>
    </StyledFooter>
  );
};

export default Footer;