import { useState } from 'react';
import { API_BASE_URL } from '../../../config/api';

export const useDocumentValidation = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [docValidationResult, setDocValidationResult] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleFileChange = (file: File | null) => {
    setDocumentFile(file);
  };

  const validateDocument = async (file: File | null, name: string, cpf: string) => {
    if (!file) {
      alert("Por favor, selecione um documento primeiro.");
      return;
    }

    setIsValidating(true);
    setDocValidationResult("⏳ Analisando documento...");

    const reader = new FileReader();
    
    return new Promise<string>((resolve, reject) => {
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];

        try {
          const response = await fetch(`${API_BASE_URL}/validate-document`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              image: base64,
              name,
              cpf
            }),
          });

          const data = await response.json();
          console.log('Resposta da validação:', data);
          setDocValidationResult(data.result);
          setIsValidating(false);
          resolve(data.result);
        } catch (error) {
          console.error('Erro ao validar documento:', error);
          const errorMsg = 'Erro ao validar documento.';
          setDocValidationResult(errorMsg);
          setIsValidating(false);
          reject(errorMsg);
        }
      };

      reader.onerror = () => {
        setIsValidating(false);
        const errorMsg = 'Erro ao ler o arquivo.';
        setDocValidationResult(errorMsg);
        reject(errorMsg);
      };

      reader.readAsDataURL(file);
    });
  };

  return {
    documentFile,
    docValidationResult,
    isValidating,
    handleFileChange,
    validateDocument
  };
};

export default useDocumentValidation;