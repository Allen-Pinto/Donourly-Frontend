import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  buttonType: 'donour' | 'receiver' | 'ask';
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FormNavbar = ({ activeButton, onButtonClick }: { activeButton: string; onButtonClick: (button: string) => void }) => {
  const navigate = useNavigate();

  const handleClick = (button: 'donour' | 'receiver' | 'ask') => {
    onButtonClick(button);
    navigate(`/${button}`);
  };

  return (
    <NavWrapper>
      <NavButton
        buttonType="donour"
        isActive={activeButton === 'donour'}
        onClick={() => handleClick('donour')}
      >
        DONOUR
      </NavButton>
      <NavButton
        buttonType="receiver"
        isActive={activeButton === 'receiver'}
        onClick={() => handleClick('receiver')}
      >
        RECIEVER
      </NavButton>
      <NavButton
        buttonType="ask"
        isActive={activeButton === 'ask'}
        onClick={() => handleClick('ask')}
      >
        ASK
      </NavButton>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  width: 100%;
  max-width: 1100px;
  margin: 300px auto 1rem;
`;

const getColor = (type: 'donour' | 'receiver' | 'ask') => {
  switch (type) {
    case 'donour':
      return '#0088FF';
    case 'receiver':
      return '#FDC726';
    case 'ask':
      return '#9a9b9a';
    default:
      return '#2c9caf';
  }
};

const NavButton = styled.button<NavButtonProps>`
  flex: 1;
  text-align: center;
  padding: 1em 2em;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  transition: all 1000ms;
  user-select: none;
  background: transparent;
  border: none;
  outline: 2px solid ${({ buttonType }) => getColor(buttonType)};
  color: ${({ buttonType }) => getColor(buttonType)};

  ${({ isActive, buttonType }) =>
    isActive &&
    `
    color: white;
    background-color: ${getColor(buttonType)};
    outline-color: ${getColor(buttonType)};
  `}

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
    outline: 2px solid ${({ buttonType }) => getColor(buttonType)};
    box-shadow: 4px 5px 17px -4px ${({ buttonType }) => getColor(buttonType)};
  }

  &::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: ${({ buttonType }) => getColor(buttonType)};
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }

  &:hover::before {
    width: 250%;
  }
`;

export default FormNavbar;
