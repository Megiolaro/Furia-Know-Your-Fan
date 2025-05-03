import React from 'react';
import { StepProps, UserProfile } from '../types/index';
import { Title, Label, Input, Button } from '../FanDataForm.styles';
import ValidationResult from './ValidationResult';
import useLinkValidation from '../hooks/useLinkValidation';

interface LinkValidationStepProps extends StepProps {
  onFinish: () => void;
}

const LinkValidationStep: React.FC<LinkValidationStepProps> = ({ 
  data, 
  updateData, 
  goToPreviousStep,
  onFinish
}) => {
  const { 
    linkValidationResult, 
    isValidating, 
    validateEsportsLink 
  } = useLinkValidation();

  const handleValidateClick = async () => {
    // Preparar o perfil do usuário para enviar à API
    const userProfile: UserProfile = {
      interests: data.interests.split(',').map(item => item.trim()).filter(item => item),
      events: data.events.split(',').map(item => item.trim()).filter(item => item),
      purchases: data.purchases.split(',').map(item => item.trim()).filter(item => item)
    };

    await validateEsportsLink(data.esportsLink, userProfile);
  };

  return (
    <>
      <Title>Validação de Link</Title>
      
      <Label>Link do Perfil ou Site de e-Sports:</Label>
      <Input
        type="text"
        value={data.esportsLink}
        onChange={(e) => updateData('esportsLink', e.target.value)}
        placeholder="Ex: https://liquipedia.net/counterstrike/FURIA"
      />

      <Button 
        type="button" 
        onClick={handleValidateClick}
        disabled={isValidating}
        style={{ opacity: isValidating ? 0.7 : 1 }}
      >
        {isValidating ? "Validando..." : "Validar Link"}
      </Button>

      <ValidationResult result={linkValidationResult} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {goToPreviousStep && (
          <Button type="button" onClick={goToPreviousStep}>
            Anterior
          </Button>
        )}
        
        <Button type="button" onClick={onFinish}>
          Finalizar
        </Button>
      </div>
    </>
  );
};

export default LinkValidationStep;