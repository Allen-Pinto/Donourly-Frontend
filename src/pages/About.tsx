import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar2 from '../components/Navbar2';

interface Props {}

const AboutUs: React.FC<Props> = () => {
  <Navbar2/>
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <Container>
      <MainContainer>
        <LeftSection>
          <ParallaxBackground 
            as={motion.div}
            style={{ y: backgroundY }}
          />
          <Content
            as={motion.div}
            style={{ y: textY }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              as={motion.h1}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ABOUT US
            </Title>
            <Description
              as={motion.p}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We are a group of BCA students from Christ University
              passionate about using technology for
              social good. Our app, Donourly, connects people who want
              to sell or donate items like furniture,
              gadgets, household goods, and stationery to NGOs and
              low-income families. The platform aims to
              reduce waste, promote sustainability, and make essential
              items more accessible to those in need.
              Donourly encourages conscious giving and responsible
              consumption—helping communities while
              protecting the environment. We're committed to making
              giving simple, impactful, and meaningful.
            </Description>
          </Content>
        </LeftSection>
        
        <RightSection>
          <TeamImage
            as={motion.img}
            style={{ y: imageY }}
            src="assets/Team.png"
            alt="The Team"
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: -5,
              transition: { duration: 0.3 }
            }}
          />
        </RightSection>
      </MainContainer>
    </Container>
  );
};

// Updated Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #333;
  position: relative;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  padding-top: 80px;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 4rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: url("assets/bg-left-about.jpg") no-repeat center/cover;
  opacity: 0.15;
  z-index: 1;
  will-change: transform;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.8;
  color: #555;
  font-family: 'Poppins', sans-serif;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    right: -10%;
    bottom: -10%;
    background: url("assets/right-section-bg.jpg") no-repeat center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const TeamImage = styled.img`
  width: 70%;
  height: 94%;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
  position: relative;
  z-index: 2;
  
  /* Enhanced shadow effects */
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 10px 20px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  
  transition: all 0.3s ease;
  will-change: transform;
`;

// Responsive Design
const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${MainContainer} {
      flex-direction: column;
    }
    
    ${LeftSection} {
      padding: 2rem 1rem;
    }
    
    ${Title} {
      font-size: 36px;
    }
    
    ${Description} {
      font-size: 18px;
    }
    
    ${RightSection} {
      min-height: 50vh;
    }
  }
  
  @media (max-width: 480px) {
    ${Title} {
      font-size: 28px;
    }
    
    ${Description} {
      font-size: 16px;
    }
  }
`;

export default AboutUs;