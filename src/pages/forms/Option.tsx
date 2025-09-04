import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledActionButtonLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: white;
  }
  
  .button-icon {
    transition: transform 0.3s ease;
  }
  
  &:hover .button-icon {
    transform: translateX(5px);
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  margin-top:90px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 3rem;
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .main-title {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 3.5rem;
    margin: 0 0 1rem 0;
    color: #333;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .main-subtitle {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #666;
    margin: 0;
    max-width: 600px;
  }

  .cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    width: 100%;
    flex-wrap: wrap;
  }

  .flip-card {
    background-color: transparent;
    width: 340px;
    height: 460px;
    perspective: 1000px;
    position: relative;
    z-index: 3;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 24px;
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .flip-card-front {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 100%);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .donor-card .flip-card-front {
    box-shadow:
      0 20px 40px rgba(0, 136, 255, 0.30),
      0 0 60px rgba(0, 136, 255, 0.1),
      0 0 0 1px rgba(0, 136, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .receiver-card .flip-card-front {
    box-shadow:
      0 20px 40px rgba(253, 199, 38, 0.30),
      0 0 60px rgba(253, 199, 38, 0.1),
      0 0 0 1px rgba(253, 199, 38, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .ask-card .flip-card-front {
    box-shadow:
      0 20px 40px rgba(154, 155, 154, 0.30),
      0 0 60px rgba(154, 155, 154, 0.15),
      0 0 0 1px rgba(154, 155, 154, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .flip-card-back {
    transform: rotateY(180deg);
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .donor-card .flip-card-back {
    background: linear-gradient(135deg,
      rgba(0, 136, 255, 0.9) 0%,
      rgba(0, 102, 204, 0.95) 100%);
    box-shadow:
      0 25px 50px rgba(0, 136, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .receiver-card .flip-card-back {
    background: linear-gradient(135deg,
      rgba(253, 199, 38, 0.9) 0%,
      rgba(240, 185, 11, 0.95) 100%);
    box-shadow:
      0 25px 50px rgba(253, 199, 38, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .ask-card .flip-card-back {
    background: linear-gradient(135deg,
      rgba(154, 155, 154, 0.9) 0%,
      rgba(120, 121, 120, 0.95) 100%);
    box-shadow:
      0 25px 50px rgba(154, 155, 154, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .card-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto 1.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    position: relative;
  }

  .donor-card .card-icon {
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    box-shadow: 0 8px 20px rgba(0, 136, 255, 0.3);
  }

  .receiver-card .card-icon {
    background: linear-gradient(135deg, #FDC726 0%, #F0B90B 100%);
    box-shadow: 0 8px 20px rgba(253, 199, 38, 0.3);
  }

  .ask-card .card-icon {
    background: linear-gradient(135deg, #9a9b9a 0%, #787978 100%);
    box-shadow: 0 8px 20px rgba(154, 155, 154, 0.3);
  }

  .card-icon::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
  }

  .card-heading {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.7rem;
    margin: 0 0 1rem 0;
    text-align: center;
    position: relative;
  }

  .donor-card .card-heading {
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .receiver-card .card-heading {
    background: linear-gradient(135deg, #FDC726 0%, #F0B90B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ask-card .card-heading {
    background: linear-gradient(135deg, #9a9b9a 0%, #787978 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .card-subtitle {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 0.95rem;
    margin: 0 0 1.8rem 0;
    text-align: center;
    line-height: 1.6;
    color: #555;
    opacity: 0.8;
  }

  .features {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    padding: 0.4rem 0;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateX(5px);
    }
  }

  .checkmark {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 1px;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }

  .feature-text {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
    line-height: 1.4;
    color: #444;
  }

  .card-footer {
    margin-top: 1.2rem;
    text-align: center;
  }

  .hover-indicator {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #999;
    font-style: italic;
    opacity: 0.7;
  }

  .back-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .back-icon {
    font-size: 3.5rem;
    margin-bottom: 1.3rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .back-heading {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.7rem;
    margin: 0 0 0.8rem 0;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .back-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.8rem;
    line-height: 1.5;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .cards-container {
      gap: 2rem;
    }
    
    .flip-card {
      width: 320px;
      height: 440px;
    }
  }

  @media (max-width: 1024px) {
    .cards-container {
      gap: 1.5rem;
    }
    
    .flip-card {
      width: 300px;
      height: 420px;
    }
    
    .main-title {
      font-size: 3rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 2rem 1rem;
    }
    
    .cards-container {
      flex-direction: column;
      gap: 2rem;
    }
    
    .flip-card {
      width: 320px;
      height: 420px;
    }
    
    .flip-card-front,
    .flip-card-back {
      padding: 2rem;
    }
    
    .main-title {
      font-size: 2.5rem;
    }
    
    .main-subtitle {
      font-size: 1rem;
    }
    
    .card-heading {
      font-size: 1.6rem;
    }
    
    .card-subtitle {
      font-size: 0.9rem;
    }
    
    .feature-text {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 1.5rem 1rem;
    }
    
    .cards-container {
      gap: 1.5rem;
    }
    
    .flip-card {
      width: 300px;
      height: 400px;
    }
    
    .flip-card-front,
    .flip-card-back {
      padding: 1.8rem;
    }
    
    .main-title {
      font-size: 2rem;
    }
    
    .card-heading {
      font-size: 1.4rem;
    }
    
    .card-subtitle {
      font-size: 0.85rem;
    }
    
    .feature-text {
      font-size: 0.8rem;
    }
  }
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  background-image: url('/assets/form.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.12;
  z-index: -1;
  will-change: transform;
`;

const Options = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <>
      <StyledWrapper>
        <ParallaxBackground as={motion.div} style={{ y: backgroundY }} />
        
        <motion.div 
          className="container"
          style={{ y: cardsY }}
        >
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="main-title">Choose Your Journey</h1>
            <p className="main-subtitle">Join our community and make a difference together</p>
          </motion.div>

          <div className="cards-container">
            {/* Donor Card */}
            <motion.div 
              className="flip-card donor-card"
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-icon"></div>
                  <h2 className="card-heading">BE A DONOR</h2>
                  <p className="card-subtitle">Your small act can make a big difference.</p>
                  <div className="features">
                    {[
                      "Support with time or resources",
                      "Help communities grow", 
                      "Be part of positive change",
                      "Inspire others to give"
                    ].map((text, index) => (
                      <motion.div 
                        key={index}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                      >
                        <span className="checkmark">✓</span>
                        <span className="feature-text">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="hover-indicator">Hover to join →</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="back-content">
                    <motion.div 
                      className="back-icon"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀
                    </motion.div>
                    <h2 className="back-heading">Ready to Make Impact?</h2>
                    <p className="back-description">Join thousands of donors creating positive change</p>
                    <StyledActionButtonLink to="/donour">
                      <span className="button-text">Join as Donor</span>
                      <span className="button-icon">→</span>
                    </StyledActionButtonLink>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Receiver Card */}
            <motion.div 
              className="flip-card receiver-card"
              initial={{ opacity: 0, y: 100, rotateY: 0 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-icon"></div>
                  <h2 className="card-heading">BE A RECEIVER</h2>
                  <p className="card-subtitle">Learn, grow, and gain support from our community.</p>
                  <div className="features">
                    {[
                      "Access free tools & resources",
                      "Get guidance & mentorship",
                      "Join supportive communities", 
                      "Grow skills for future giving"
                    ].map((text, index) => (
                      <motion.div 
                        key={index}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                      >
                        <span className="checkmark">✓</span>
                        <span className="feature-text">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="hover-indicator">Hover to join →</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="back-content">
                    <motion.div 
                      className="back-icon"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📚
                    </motion.div>
                    <h2 className="back-heading">Start Your Growth Journey</h2>
                    <p className="back-description">Access resources and connect with mentors today</p>
                    <StyledActionButtonLink to="/receiver">
                      <span className="button-text">Join as Receiver</span>
                      <span className="button-icon">→</span>
                    </StyledActionButtonLink>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ask Card */}
            <motion.div 
              className="flip-card ask-card"
              initial={{ opacity: 0, y: 100, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-icon"></div>
                  <h2 className="card-heading">POST A REQUEST</h2>
                  <p className="card-subtitle">Share your needs and connect with generous hearts.</p>
                  <div className="features">
                    {[
                      "Post specific requirements",
                      "Connect with willing donors",
                      "Share your story publicly", 
                      "Track request responses"
                    ].map((text, index) => (
                      <motion.div 
                        key={index}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                      >
                        <span className="checkmark">✓</span>
                        <span className="feature-text">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="hover-indicator">Hover to join →</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="back-content">
                    <motion.div 
                      className="back-icon"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💬
                    </motion.div>
                    <h2 className="back-heading">Need Something?</h2>
                    <p className="back-description">Post your request and let the community help you</p>
                    <StyledActionButtonLink to="/ask">
                      <span className="button-text">Post Request</span>
                      <span className="button-icon">→</span>
                    </StyledActionButtonLink>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </StyledWrapper>
    </>
  );
};

export default Options;