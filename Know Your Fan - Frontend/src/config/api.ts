// Usa a variável de ambiente em produção ou fallback para localhost em desenvolvimento
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';