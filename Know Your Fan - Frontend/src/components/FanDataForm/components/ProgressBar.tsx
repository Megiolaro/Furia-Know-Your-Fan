import React from 'react';
import { ProgressContainer, ProgressStep, ProgressLine } from '../FanDataForm.styles';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <ProgressContainer>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isLast = stepNumber === totalSteps;
        
        return (
          <React.Fragment key={stepNumber}>
            <ProgressStep active={currentStep >= stepNumber}>
              {stepNumber}
            </ProgressStep>
            
            {!isLast && <ProgressLine />}
          </React.Fragment>
        );
      })}
    </ProgressContainer>
  );
};

export default ProgressBar;