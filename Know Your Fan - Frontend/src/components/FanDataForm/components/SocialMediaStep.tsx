import React from 'react';
import { StepProps } from '../types/index';
import SocialMediaConnect from '../../SocialMediaConnect/SocialMediaConnect';
import { Button } from '../FanDataForm.styles';

const SocialMediaStep: React.FC<StepProps> = ({ goToNextStep, goToPreviousStep }) => {
  return (
    <>
      <SocialMediaConnect />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {goToPreviousStep && (
          <Button type="button" onClick={goToPreviousStep}>
            Anterior
          </Button>
        )}
        
        {goToNextStep && (
          <Button type="button" onClick={goToNextStep}>
            Próximo
          </Button>
        )}
      </div>
    </>
  );
};

export default SocialMediaStep;