import React, { useState } from 'react';
import { FanDataFormProps, FanFormData } from './types/index';
import PersonalInfoStep from './components/PersonalInfoStep';
import SocialMediaStep from './components/SocialMediaStep';
import LinkValidationStep from './components/LinkValidationStep';
import ProgressBar from './components/ProgressBar';
import { Container, CloseButton, FormFooter } from './FanDataForm.styles';

const FanDataForm: React.FC<FanDataFormProps> = ({ onClose }) => {
  // Estado centralizado do formulário
  const [formData, setFormData] = useState<FanFormData>({
    name: '',
    cpf: '',
    address: '',
    interests: '',
    events: '',
    purchases: '',
    esportsLink: '',
    documentFile: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 3;

  // Função para atualizar um campo específico do formulário
  const updateFormData = (key: keyof FanFormData, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Preparar dados para envio
    const submissionData = {
      name: formData.name,
      cpf: formData.cpf,
      address: formData.address,
      interests: formData.interests.split(',').map(item => item.trim()),
      events: formData.events.split(',').map(item => item.trim()),
      purchases: formData.purchases.split(',').map(item => item.trim()),
      esportsLink: formData.esportsLink
    };
    
    console.log("Dados enviados:", submissionData);
    
    
    if (onClose) {
      onClose();
    }
  };

  // Renderiza a etapa atual do formulário
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            data={formData}
            updateData={updateFormData}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <SocialMediaStep 
            data={formData}
            updateData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <LinkValidationStep 
            data={formData}
            updateData={updateFormData}
            goToPreviousStep={goToPreviousStep}
            onFinish={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      {onClose && <CloseButton type="button" onClick={onClose}>X Fechar</CloseButton>}
      
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      {renderCurrentStep()}
      
      <FormFooter />
    </Container>
  );
};

export default FanDataForm;