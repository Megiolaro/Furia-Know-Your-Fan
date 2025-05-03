import styled from "styled-components";

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
  margin-bottom: 1rem;
  
  &::placeholder {
    color: #6c7a89;
  }
`;

export const Button = styled.button`
  background-color: #D68A00;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #FF9F00;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  background-color: #D68A00;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  float: right;
  
  &:hover {
    background-color: #FF9F00;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const ProgressStep = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#D68A00' : '#4a6278'};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 0 1rem;
`;

export const ProgressLine = styled.div`
  height: 2px;
  width: 80px;
  background-color: #4a6278;
`;

export const FormFooter = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const FileInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ValidationResultContainer = styled.div<{ success?: boolean }>`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => 
    props.success === undefined ? '#fff3e0' : 
    props.success ? '#e8f5e9' : '#ffebee'
  };
  border-radius: 5px;
  border: 1px solid ${props => 
    props.success === undefined ? '#ffe0b2' : 
    props.success ? '#c8e6c9' : '#ffcdd2'
  };
  color: #333;
`;