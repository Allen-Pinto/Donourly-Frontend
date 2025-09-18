import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledDonateButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 3px 10px rgba(0, 136, 255, 0.3);
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 136, 255, 0.4);
    background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

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
  margin-top: 90px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

  .content-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    width: 100%;
    max-width: 1400px;
    flex-wrap: wrap;
  }

  .donor-section {
    flex: 1;
    min-width: 340px;
    max-width: 500px;
  }

  .requests-section {
    flex: 1;
    min-width: 340px;
    max-width: 600px;
  }

  .flip-card {
    background-color: transparent;
    width: 100%;
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
      0 20px 40px rgba(0, 136, 255, 0.30),
      0 0 60px rgba(0, 136, 255, 0.1),
      0 0 0 1px rgba(0, 136, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .flip-card-back {
    transform: rotateY(180deg);
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg,
      rgba(0, 136, 255, 0.9) 0%,
      rgba(0, 102, 204, 0.95) 100%);
    box-shadow:
      0 25px 50px rgba(0, 136, 255, 0.3),
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
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    box-shadow: 0 8px 20px rgba(0, 136, 255, 0.3);
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
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
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

  .requests-card {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 20px 40px rgba(0, 136, 255, 0.15),
      0 0 60px rgba(0, 136, 255, 0.05),
      0 0 0 1px rgba(0, 136, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    padding: 2.2rem;
    height: 460px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .requests-header {
    text-align: center;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .requests-title {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.7rem;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .requests-subtitle {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  .requests-feed {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    overflow-y: clip;
    flex: 1;
    padding-right: 0.5rem;
    margin-right: -0.5rem;
  }

  .requests-feed::-webkit-scrollbar {
    width: 6px;
  }

  .requests-feed::-webkit-scrollbar-track {
    background: rgba(0, 136, 255, 0.1);
    border-radius: 3px;
  }

  .requests-feed::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    border-radius: 3px;
  }

  .requests-feed::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
  }

  .request-item {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 136, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 136, 255, 0.2);
      border-color: rgba(0, 136, 255, 0.3);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    }
  }

  .request-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .request-org {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0088FF;
    margin: 0;
  }

  .request-time {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: white;
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 600;
  }

  .request-title {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .request-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }

  .request-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .request-category {
    background: linear-gradient(135deg, #0088FF 0%, #0066CC 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .request-urgency {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;

    &.high {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }

    &.medium {
      background: rgba(253, 199, 38, 0.1);
      color: #f0b90b;
    }

    &.low {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }
  }

  .request-actions {
    display: flex;
    justify-content: flex-end;
  }

  .view-all-btn {
    margin-top: 1rem;
    text-align: center;
    flex-shrink: 0;
  }

  .view-all-link {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0088FF;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border: 1px solid rgba(0, 136, 255, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    cursor: pointer;

    &:hover {
      background: rgba(0, 136, 255, 0.1);
      border-color: #0088FF;
      transform: translateY(-1px);
    }
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .content-container {
      gap: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .content-container {
      gap: 1.5rem;
    }
    
    .main-title {
      font-size: 3rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 2rem 1rem;
    }
    
    .content-container {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }

    .donor-section,
    .requests-section {
      width: 100%;
      max-width: 400px;
    }
    
    .main-title {
      font-size: 2.5rem;
    }
    
    .main-subtitle {
      font-size: 1rem;
    }
    
    .card-heading,
    .requests-title {
      font-size: 1.6rem;
    }
    
    .card-subtitle,
    .requests-subtitle {
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

    .donor-section,
    .requests-section {
      max-width: 320px;
    }
    
    .flip-card-front,
    .flip-card-back,
    .requests-card {
      padding: 1.8rem;
    }
    
    .main-title {
      font-size: 2rem;
    }
    
    .card-heading,
    .requests-title {
      font-size: 1.4rem;
    }
    
    .card-subtitle,
    .requests-subtitle {
      font-size: 0.85rem;
    }
    
    .feature-text {
      font-size: 0.8rem;
    }

    .request-header {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }
  }
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
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
  
  // State for real requirements data
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch requirements from API
  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://donourly-backend.onrender.com/api/requirements');
      const result = await response.json();
      
      if (result.success) {
        setRequirements(result.data);
      } else {
        setError('Failed to load requirements');
      }
    } catch (error) {
      console.error('Error fetching requirements:', error);
      setError('Failed to load requirements');
    } finally {
      setLoading(false);
    }
  };

  const handleDonateNow = async (requirementId: string, receiverInfo: any) => {
    try {
      // Process donation to requirement
      const response = await fetch(`https://donourly-backend.onrender.com/api/requirements/${requirementId}/donate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorId: 'current_donor_id' // In a real app, get this from auth context
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`Donation started! Here are the receiver details:\nName: ${receiverInfo.receiverName}\nEmail: ${receiverInfo.receiverEmail}`);
        // Remove the requirement from the list since it's now fulfilled
        setRequirements(prev => prev.filter((req: any) => req._id !== requirementId));
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Failed to process donation. Please try again.');
    }
  };

  const formatUrgency = (urgency: string) => {
    const colors = {
      'High': '#ff4757',
      'Medium': '#ffa726',
      'Low': '#26de81'
    };
    return { color: colors[urgency as keyof typeof colors] || '#666', text: urgency };
  };

  const formatQuantity = (quantity: string, customQuantity?: number) => {
    if (quantity === 'custom' && customQuantity) {
      return customQuantity.toString();
    }
    return quantity;
  };

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
            <h1 className="main-title">Donor Dashboard</h1>
            <p className="main-subtitle">Make a difference by helping those in need</p>
          </motion.div>

          <div className="content-container">
            {/* Make Donation Section */}
            <motion.div 
              className="donor-section"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-icon"></div>
                    <h2 className="card-heading">MAKE A DONATION</h2>
                    <p className="card-subtitle">Share your resources and spread kindness.</p>
                    <div className="features">
                      {[
                        "Post donation offerings",
                        "Help those in need",
                        "Make a real impact",
                        "Track your contributions"
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
                      <div className="hover-indicator">Hover to donate →</div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="back-content">
                      <motion.div 
                        className="back-icon"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💝
                      </motion.div>
                      <h2 className="back-heading">Ready to Give?</h2>
                      <p className="back-description">Post your donation and help someone in need</p>
                      <Link to="/donour" style={{ textDecoration: 'none' }}>
                        <StyledDonateButton>
                          <span className="button-text">Donate Now</span>
                          <span className="button-icon">→</span>
                        </StyledDonateButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Requirements Section */}
            <motion.div 
              className="requests-section"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="requests-card">
                <div className="requests-header">
                  <h2 className="requests-title">Help Requests</h2>
                  <p className="requests-subtitle">People in your community who need your support</p>
                </div>

                <div className="requests-feed">
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                      <p>Loading requests...</p>
                    </div>
                  ) : error ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                      <p>{error}</p>
                      <button onClick={fetchRequirements}>Retry</button>
                    </div>
                  ) : requirements.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                      <p>No help requests at the moment.</p>
                    </div>
                  ) : (
                    requirements.map((requirement: any, index) => (
                      <motion.div
                        key={requirement._id}
                        className="request-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="request-header">
                          <p className="request-org">{requirement.receiverName}</p>
                          <span 
                            className="request-time"
                            style={{ 
                              background: formatUrgency(requirement.urgency).color,
                              color: 'white'
                            }}
                          >
                            {formatUrgency(requirement.urgency).text}
                          </span>
                        </div>
                        
                        <h3 className="request-title">
                          {requirement.itemType} - Qty: {formatQuantity(requirement.quantity, requirement.customQuantity)}
                        </h3>
                        <p className="request-description">{requirement.description}</p>
                        
                        <div className="request-details">
                          <span className="request-category">{requirement.itemType}</span>
                          <span className="request-urgency low">
                            {new Date(requirement.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="request-actions">
                          <StyledDonateButton
                            onClick={() => handleDonateNow(requirement._id, {
                              receiverName: requirement.receiverName,
                              receiverEmail: requirement.receiverEmail
                            })}
                          >
                            <span>Donate Now</span>
                            <span className="button-icon">→</span>
                          </StyledDonateButton>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="view-all-btn">
                  <button onClick={fetchRequirements} className="view-all-link">
                    <span>Refresh Requests</span>
                    <span>↻</span>
                  </button>
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