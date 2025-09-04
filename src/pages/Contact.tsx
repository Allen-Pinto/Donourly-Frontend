import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar2 from '../components/Navbar2';
import { scrollToSection } from '../hooks/useParallax';
import Footer from '../components/Footer';

interface Props {}

const Contact: React.FC<Props> = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const leftBgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const formY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const handleDonateClick = () => {
    scrollToSection('options');
  };

  return (
    <Container>
      <MainContainer>
        <LeftSection>
          <LeftBackground as={motion.div} style={{ y: leftBgY }} />
          <Content
            as={motion.div}
            style={{ y: contentY }}
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
              YOUR FEEDBACK HELP US IMPROVE
            </Title>
            
            <Description
              as={motion.p}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We are here to help you and we'd love to connect with you.
            </Description>

            <GetBackText
              as={motion.p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We'll get back in 24 hours.
            </GetBackText>

            <DonationBox
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <DonationTitle>Contribute to our mission</DonationTitle>
              <DonationDescription>
                Your support helps us reach more people and create a bigger impact.
              </DonationDescription>
              <DonationButton 
                as={motion.button}
                onClick={handleDonateClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DONATE
              </DonationButton>
            </DonationBox>
          </Content>
        </LeftSection>

        <RightSection>
          <FormWrapper
            as={motion.div}
            style={{ y: formY }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FormTitle
              as={motion.h2}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              GET IN TOUCH
            </FormTitle>
            
            <Form>
              <FormInput
                as={motion.input}
                type="text"
                placeholder="Name"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileFocus={{ scale: 1.02 }}
              />
              
              <FormInput
                as={motion.input}
                type="email"
                placeholder="Email"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileFocus={{ scale: 1.02 }}
              />
              
              <FormTextarea
                as={motion.textarea}
                placeholder="Message"
                rows={5}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 }}
                whileFocus={{ scale: 1.02 }}
              />
              
              <FormButton
                as={motion.button}
                type="submit"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEND MESSAGE
              </FormButton>
            </Form>
          </FormWrapper>
        </RightSection>
      </MainContainer>
      {/* <Footer /> */}
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
  justify-content: center;
  overflow: hidden;
`;

const LeftBackground = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  // background: url("/assets/bg-left-contact.jpg") no-repeat center/cover;
  opacity: 0.2;
  z-index: 1;
  will-change: transform;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.8;
  color: #555;
  font-family: 'Poppins', sans-serif;
`;

const GetBackText = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-top: 1rem;
  color: #555;
  font-family: 'Poppins', sans-serif;
`;

const DonationBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

const DonationTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const DonationDescription = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 250px;
`;

const DonationButton = styled.button`
  background-color: #000;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #000;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-size: 16px;
  resize: vertical;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #000;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const FormButton = styled.button`
  width: 100%;
  padding: 18px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default Contact;