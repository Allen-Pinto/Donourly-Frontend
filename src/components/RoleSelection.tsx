import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface RoleSelectionProps {
  onRoleSelect: (role: 'donor' | 'receiver') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <SelectionContainer>
      <BackgroundPattern />
      
      <SelectionContent>
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeaderContainer>
            <WelcomeTitle>Welcome to DONOURLY</WelcomeTitle>
            <WelcomeSubtitle>Choose your path to making a difference</WelcomeSubtitle>
          </HeaderContainer>
        </motion.div>

        <RoleCards>
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <RoleCard 
              onClick={() => onRoleSelect('donor')} 
              className="donor"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardHeader className="donor">
                <CardIcon>
                  <IconWrapper className="donor">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
                    </svg>
                  </IconWrapper>
                </CardIcon>
                <CardBadge className="donor">Donor</CardBadge>
              </CardHeader>
              
              <CardTitle>Share & Support</CardTitle>
              <CardDescription>
                Join our community of changemakers. Your contributions create lasting impact and transform lives across communities.
              </CardDescription>
              
              <FeaturesList>
                <FeatureItem>
                  <FeatureDot className="donor" />
                  Support meaningful causes
                </FeatureItem>
                <FeatureItem>
                  <FeatureDot className="donor" />
                  Track your impact metrics
                </FeatureItem>
                <FeatureItem>
                  <FeatureDot className="donor" />
                  Connect with communities
                </FeatureItem>
              </FeaturesList>

              <ActionButton className="donor">
                <span>Continue as Donor</span>
                <ButtonArrow>→</ButtonArrow>
              </ActionButton>
            </RoleCard>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <RoleCard 
              onClick={() => onRoleSelect('receiver')} 
              className="receiver"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardHeader className="receiver">
                <CardIcon>
                  <IconWrapper className="receiver">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </IconWrapper>
                </CardIcon>
                <CardBadge className="receiver">Receiver</CardBadge>
              </CardHeader>
              
              <CardTitle>Grow & Thrive</CardTitle>
              <CardDescription>
                Access resources and support from our caring community. Let us help you achieve your goals and build a brighter future.
              </CardDescription>
              
              <FeaturesList>
                <FeatureItem>
                  <FeatureDot className="receiver" />
                  Post your needs safely
                </FeatureItem>
                <FeatureItem>
                  <FeatureDot className="receiver" />
                  Access verified resources
                </FeatureItem>
                <FeatureItem>
                  <FeatureDot className="receiver" />
                  Join support networks
                </FeatureItem>
              </FeaturesList>

              <ActionButton className="receiver">
                <span>Continue as Receiver</span>
                <ButtonArrow>→</ButtonArrow>
              </ActionButton>
            </RoleCard>
          </motion.div>
        </RoleCards>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <BottomSection>
            <SkipButton onClick={() => onRoleSelect('donor')}>
              <SkipText>Skip for now</SkipText>
              <SkipSubtext>Continue as guest</SkipSubtext>
            </SkipButton>
          </BottomSection>
        </motion.div>
      </SelectionContent>
    </SelectionContainer>
  );
};

// Styled Components
const SelectionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
  background-size: 800px 800px;
`;

const SelectionContent = styled.div`
  text-align: center;
  max-width: 1100px;
  width: 100%;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  margin-bottom: 4rem;
`;

const WelcomeTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
`;

const WelcomeSubtitle = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.01em;
`;

const RoleCards = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RoleCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  width: 380px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.donor {
    &:hover {
      border-color: rgba(99, 102, 241, 0.2);
      box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.08), 0 10px 10px -5px rgba(99, 102, 241, 0.04);
    }
  }

  &.receiver {
    &:hover {
      border-color: rgba(168, 85, 247, 0.2);
      box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.08), 0 10px 10px -5px rgba(168, 85, 247, 0.04);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.donor::before {
    color: #6366f1;
  }

  &.receiver::before {
    color: #a855f7;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.donor {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
  
  &.receiver {
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
  }
`;

const CardBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  
  &.donor {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
  
  &.receiver {
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
  }
`;

const CardTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  text-align: left;
`;

const CardDescription = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const FeaturesList = styled.div`
  margin-bottom: 2rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const FeatureDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 0.75rem;
  flex-shrink: 0;
  
  &.donor {
    background: #6366f1;
  }
  
  &.receiver {
    background: #a855f7;
  }
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.donor {
    background: #6366f1;
    color: white;
    
    &:hover {
      background: #5b5bd6;
      transform: translateY(-1px);
    }
  }

  &.receiver {
    background: #a855f7;
    color: white;
    
    &:hover {
      background: #9333ea;
      transform: translateY(-1px);
    }
  }
`;

const ButtonArrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  
  ${ActionButton}:hover & {
    transform: translateX(4px);
  }
`;

const BottomSection = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  margin-top: 1rem;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const SkipText = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const SkipSubtext = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.8rem;
  color: #9ca3af;
`;

export default RoleSelection;