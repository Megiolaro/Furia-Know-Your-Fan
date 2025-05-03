// Funções auxiliares de validação

/**
 * Valida formato de CPF
 * @param cpf CPF para validar
 * @returns Boolean indicando se o formato é válido
 */
export const isValidCPF = (cpf: string): boolean => {
    const cpfClean = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpfClean.length !== 11) {
      return false;
    }
    
    // Verifica se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1{10}$/.test(cpfClean)) {
      return false;
    }
    
    // Implementação básica - para validação completa seria necessário
    // verificar os dígitos verificadores
    return true;
  };
  
  /**
   * Valida se uma URL é válida
   * @param url URL para validar
   * @returns Boolean indicando se a URL é válida
   */
  export const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  /**
   * Converte string separada por vírgulas em array
   * @param input String com itens separados por vírgulas
   * @returns Array com os itens limpos
   */
  export const commaStringToArray = (input: string): string[] => {
    return input
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };
  
  /**
   * Valida tamanho do arquivo
   * @param file Arquivo para validar
   * @param maxSizeMB Tamanho máximo em MB
   * @returns Boolean indicando se o arquivo é válido
   */
  export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  };