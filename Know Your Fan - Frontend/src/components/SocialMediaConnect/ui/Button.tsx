import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  isConnected?: boolean;
}

const StyledButton = styled.button<{
  fullWidth?: boolean;
  isConnected?: boolean;
  btnColor?: string;
}>`
  background-color: ${props => props.isConnected ? "#28a745" : props.btnColor || "#1da1f2"};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: ${props => props.isConnected || props.disabled ? "default" : "pointer"};
  width: ${props => props.fullWidth ? "100%" : "120px"};
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  color = "#1da1f2",
  fullWidth = false,
  children,
  isConnected = false
}) => {
  return (
    <StyledButton 
      onClick={onClick} 
      disabled={disabled || isConnected}
      btnColor={color}
      fullWidth={fullWidth}
      isConnected={isConnected}
    >
      {children}
    </StyledButton>
  );
};

export default Button;