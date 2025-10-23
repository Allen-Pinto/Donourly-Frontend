import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar2 from '../components/Navbar2';

interface Props {}

const WhomWeHelp: React.FC<Props> = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const leftBgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightBgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const beneficiaries = [
    { src: "/assets/Help/ngo.png", alt: "NGOs", label: "NGOs", className: "ngos" },
    { src: "/assets/Help/income.png", alt: "Low Income Families", label: "Low Income Families", className: "low-income" },
    { src: "/assets/Help/orphanage.png", alt: "Orphanages", label: "Orphanages", className: "orphanages" },
    { src: "/assets/Help/old-house.png", alt: "Old Age Homes", label: "Old Age Homes", className: "old-age" },
    { src: "/assets/Help/poor_children.png", alt: "Underprivileged Children", label: "Underprivileged Children", className: "children" },
    { src: "assets/Help/poverty.png", alt: "Needy Individuals", label: "Needy Individuals", className: "needy" }
  ];

  return (
    <Container>
      <MainContainer>
        <LeftSection>
          <LeftBackground as={motion.div} style={{ y: leftBgY }} />
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
              WHOM WE HELP
            </Title>
            <Description
              as={motion.p}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FirstWord>Donourly</FirstWord> is committed to supporting those
              in need by connecting donors with trusted beneficiaries.
              We help NGOs, low-income families,
              orphanages, old age homes, and underprivileged children
              who lack access to proper education and
              basic necessities. By providing furniture, gadgets,
              stationery, and household items, we aim to ease
              daily challenges and improve quality of life. Our platform
              fosters a cycle of giving, helping build a
              more inclusive and compassionate society.
            </Description>
          </Content>
        </LeftSection>

        <RightSection>
          <RightBackground as={motion.div} style={{ y: rightBgY }} />
          <GraphicsContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            {beneficiaries.map((beneficiary, index) => (
              <BeneficiaryCircle
                key={index}
                className={beneficiary.className}
                as={motion.div}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <CircleIcon
                  as={motion.img}
                  src={beneficiary.src}
                  alt={beneficiary.alt}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <CircleLabel
                  as={motion.span}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
                >
                  {beneficiary.label}
                </CircleLabel>
              </BeneficiaryCircle>
            ))}
          </GraphicsContainer>
        </RightSection>
      </MainContainer>
    </Container>
  );
};

// Styled Components with Full Responsive Support
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

  @media (max-width: 1024px) {
    padding-top: 70px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 60px;
    min-height: auto;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 4rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 50vh;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const LeftBackground = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: url("assets/bg-left-about.jpg") no-repeat center/cover;
  opacity: 0.2;
  z-index: 1;
  will-change: transform;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;

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
    margin-bottom: 1rem;
  }

  @media (max-width: 360px) {
    font-size: 24px;
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
    font-size: 16px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.6;
  }

  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

const FirstWord = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
  position: relative;
  
  /* Paint brush effect behind Donourly */
  &::before {
    content: "";
    position: absolute;
    top: -94px;
    left: -45px;
    right: -10px;
    bottom: -5px;
    background: url("assets/2.png") no-repeat center/cover;
    z-index: -1;
    opacity: 1;
    height: 250px;
    width: 250px;
  }

  @media (max-width: 1024px) {
    font-size: 36px;

    &::before {
      height: 220px;
      width: 220px;
      top: -85px;
      left: -40px;
    }
  }

  @media (max-width: 768px) {
    font-size: 32px;

    &::before {
      height: 200px;
      width: 200px;
      top: -75px;
      left: -35px;
    }
  }

  @media (max-width: 480px) {
    font-size: 26px;

    &::before {
      height: 160px;
      width: 160px;
      top: -60px;
      left: -28px;
    }
  }

  @media (max-width: 360px) {
    font-size: 22px;

    &::before {
      height: 140px;
      width: 140px;
      top: -52px;
      left: -24px;
    }
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

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 60vh;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    min-height: auto;
  }
`;

const RightBackground = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: url("assets/right-section-bg.jpg") no-repeat center/cover;
  opacity: 0.15;
  z-index: 1;
  will-change: transform;
`;

const GraphicsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 15px 0;
  }
`;

const BeneficiaryCircle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  /* Enhanced positioning with smoother distribution */
  &.ngos {
    top: 8%;
    left: 18%;
  }

  &.low-income {
    top: 15%;
    right: 12%;
  }

  &.orphanages {
    top: 40%;
    left: 18%;
  }

  &.old-age {
    top: 70%;
    left: 16%;
  }

  &.children {
    top: 78%;
    right: 10%;
  }

  &.needy {
    top: 48%;
    right: 15%;
  }

  @media (max-width: 1200px) {
    &.ngos {
      top: 10%;
      left: 15%;
    }

    &.low-income {
      top: 12%;
      right: 10%;
    }

    &.orphanages {
      top: 38%;
      left: 12%;
    }

    &.old-age {
      top: 68%;
      left: 14%;
    }

    &.children {
      top: 75%;
      right: 8%;
    }

    &.needy {
      top: 45%;
      right: 12%;
    }
  }

  @media (max-width: 768px) {
    position: static;
    margin: 0;
  }
`;

const CircleIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  padding: 15px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 0 0 3px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  will-change: transform;
  
  &:hover {
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.25),
      0 0 0 3px rgba(255, 255, 255, 1);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    padding: 10px;
  }
`;

const CircleLabel = styled.span`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 8px 15px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 7px 12px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    margin-top: 10px;
    white-space: normal;
    max-width: 120px;
  }
`;

export default WhomWeHelp;