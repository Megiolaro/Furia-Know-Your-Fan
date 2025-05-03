import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1c1c1c;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
`;

export const Label = styled.label`
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #2c3e50;
  background-color: #1e2a38;
  color: white;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProfileDetails = styled.div`
  background-color: #1e2a38;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledButton = styled.button<{ 
  fullWidth?: boolean; 
  isConnected?: boolean; 
  color?: string;
}>`
  background-color: ${props => props.isConnected ? "#28a745" : props.color || "#1da1f2"};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: ${props => props.isConnected || props.disabled ? "default" : "pointer"};
  width: ${props => props.fullWidth ? "100%" : "120px"};
`;

export const AnalyzeButton = styled(StyledButton)`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #8e44ad;
`;

export const AnalysisContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #6c5ce7;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
`;

export const AnalysisHeader = styled.h3`
  color: #8e44ad;
`;