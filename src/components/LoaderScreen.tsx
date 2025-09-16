import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

interface LoaderScreenProps {
  onLoadingComplete: () => void;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <LoaderContainer>
      <BackgroundPattern />
      
      <LoaderContent>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <LogoContainer>
            <LogoWrapper>
              <Logo src="assets/DONOURLY/1.png" alt="DONOURLY" />
              <LogoPulse />
            </LogoWrapper>
            <BrandContainer>
              <LogoText>DONOURLY</LogoText>
              <LogoDot>•</LogoDot>
            </BrandContainer>
          </LogoContainer>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <TagLine>Connecting Hearts, Creating Change</TagLine>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ProgressContainer>
            <ProgressTrack>
              <ProgressFill 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
              <ProgressGlow progress={progress} />
            </ProgressTrack>
            <ProgressLabel>{Math.round(progress)}%</ProgressLabel>
          </ProgressContainer>
        </motion.div>

        <LoadingIndicator>
          <DotContainer>
            {[0, 1, 2].map((i) => (
              <LoadingDot
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </DotContainer>
        </LoadingIndicator>
      </LoaderContent>

      <FloatingElements>
        {[...Array(8)].map((_, i) => (
          <FloatingElement
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: 0 
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${10 + (i * 12)}%`,
            }}
          >
            {i % 3 === 0 ? '♡' : i % 3 === 1 ? '○' : '◇'}
          </FloatingElement>
        ))}
      </FloatingElements>
    </LoaderContainer>
  );
};

// Keyframes
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
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
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
  background-size: 600px 600px;
  animation: ${float} 20s ease-in-out infinite;
`;

const LoaderContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const LogoWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  filter: none;
  position: relative;
  z-index: 2;
`;

const LogoPulse = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  letter-spacing: -0.02em;
`;

const LogoDot = styled.span`
  font-size: 2rem;
  color: #6366f1;
  margin-top: -8px;
`;

const TagLine = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.1rem;
  margin-bottom: 4rem;
  color: #6b7280;
  font-weight: 400;
  letter-spacing: 0.01em;
`;

const ProgressContainer = styled.div`
  width: 280px;
  margin: 0 auto 2rem;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 3px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 3px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const ProgressGlow = styled.div<{ progress: number }>`
  position: absolute;
  top: -1px;
  left: 0;
  width: ${props => props.progress}%;
  height: 5px;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 3px;
  filter: blur(4px);
  opacity: 0.4;
`;

const ProgressLabel = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #9ca3af;
  text-align: center;
`;

const LoadingIndicator = styled.div`
  margin-top: 2rem;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const LoadingDot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: #6366f1;
  border-radius: 50%;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 1.2rem;
  color: rgba(99, 102, 241, 0.2);
  user-select: none;
`;

export default LoaderScreen;