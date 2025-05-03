import React from 'react';
import { StepProps } from '../types/index';
import useDocumentValidation from '../hooks/useDocumentValidation';
import { Title, Label, Input, Button, FileInputContainer } from '../FanDataForm.styles';

const PersonalInfoStep: React.FC<StepProps> = ({ data, updateData, goToNextStep }) => {
  const {
    docValidationResult,
    isValidating,
    validateDocument
  } = useDocumentValidation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData('documentFile', e.target.files[0]);
    }
  };

  const handleAnalyzeDocument = async () => {
    if (data.documentFile) {
      await validateDocument(data.documentFile, data.name, data.cpf);
    }
  };

  return (
    <>
      <Title>Dados do Fã</Title>

      <Label>Nome:</Label>
      <Input 
        type="text" 
        value={data.name} 
        onChange={(e) => updateData('name', e.target.value)} 
        required 
      />

      <Label>CPF:</Label>
      <Input 
        type="text" 
        value={data.cpf} 
        onChange={(e) => updateData('cpf', e.target.value)} 
        required 
      />

      <Label>Endereço:</Label>
      <Input 
        type="text" 
        value={data.address} 
        onChange={(e) => updateData('address', e.target.value)} 
        required 
      />

      <Label>Interesses em e-Sports (separados por vírgula):</Label>
      <Input 
        type="text" 
        value={data.interests} 
        onChange={(e) => updateData('interests', e.target.value)} 
        placeholder="Ex: CS2, Valorant, League of Legends"
      />

      <Label>Eventos que participou no último ano:</Label>
      <Input 
        type="text" 
        value={data.events} 
        onChange={(e) => updateData('events', e.target.value)} 
        placeholder="Ex: ESL One Rio, Brazil Gaming House"
      />

      <Label>Compras relacionadas a e-Sports:</Label>
      <Input 
        type="text" 
        value={data.purchases} 
        onChange={(e) => updateData('purchases', e.target.value)} 
        placeholder="Ex: Camisa FURIA, Headset Gamer, Pass Battle CSGO"
      />

      <Label>Upload do Documento (foto do CPF/RG):</Label>
      <FileInputContainer>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button 
          type="button" 
          onClick={handleAnalyzeDocument}
          disabled={isValidating}
        >
          {isValidating ? "Verificando..." : "Verificar"}
        </Button>
      </FileInputContainer>

      {docValidationResult && (
        <p style={{ marginTop: "0.5rem" }}>{docValidationResult}</p>
      )}

      {goToNextStep && (
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button type="button" onClick={goToNextStep}>
            Próximo
          </Button>
        </div>
      )}
    </>
  );
};

export default PersonalInfoStep;