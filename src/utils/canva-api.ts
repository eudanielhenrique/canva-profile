import { CanvaProfileResponse } from '../types/canva';

interface CanvaApiResponse {
  profile: CanvaProfileResponse;
  rawResponse?: string;
}

export async function fetchCanvaProfile(username: string): Promise<CanvaApiResponse> {
  try {
    // Usar uma URL clara e bem formatada
    const apiUrl = `/api/canva-profile/${encodeURIComponent(username)}`;
    console.log(`Fazendo requisição para: ${apiUrl}`);
    
    // Fazer requisição para nossa API route local
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erro ao buscar perfil: ${response.status}`;
      
      try {
        // Tenta extrair mensagem de erro se for JSON
        const errorData = JSON.parse(errorText);
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // Se não for JSON, usa o texto bruto
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse da resposta JSON
    const data = await response.json();
    
    // Valida que temos os dados necessários
    if (!data.profile || !data.profile.id) {
      throw new Error('Dados do perfil inválidos ou incompletos');
    }
    
    console.log(`Perfil carregado: ${data.profile.displayName} (${data.profile.id})`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}
