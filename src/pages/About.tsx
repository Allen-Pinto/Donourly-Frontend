import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {}

const AboutUs: React.FC<Props> = () => {
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
            src="assets/Team.webp"
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

// Styled Components
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
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 4rem 3rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 3rem 2.5rem;
  }

  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
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

  @media (max-width: 768px) {
    opacity: 0.1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 1024px) {
    font-size: 42px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 1.25rem;
  }
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.8;
  color: #555;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    font-size: 17px;
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.6;
  }
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

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  /* Hide image on tablets and mobile */
  @media (max-width: 768px) {
    display: none;
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
  
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 10px 20px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  
  transition: all 0.3s ease;
  will-change: transform;

  @media (max-width: 1200px) {
    width: 75%;
    height: 90%;
  }

  @media (max-width: 1024px) {
    width: 80%;
    height: 85%;
  }
`;

export default AboutUs;