import { CanvaProfileResponse } from '../types/canva';

interface CanvaApiResponse {
  profile: CanvaProfileResponse;
  rawResponse?: string;
}

export async function fetchCanvaProfile(username: string): Promise<CanvaApiResponse> {
  try {
    // Tenta primeira a API real
    try {
      const apiUrl = `/api/canva-profile/${encodeURIComponent(username)}`;
      console.log(`Tentando usar API real: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Perfil carregado da API real: ${data.profile.displayName}`);
        return data;
      } else {
        console.log('API real falhou, tentando mock...');
      }
    } catch (realApiError) {
      console.error('Erro na API real:', realApiError);
    }
    
    // Se a API real falhar, tenta usar a mock
    const mockUrl = `/api/mock-profile/${encodeURIComponent(username)}`;
    console.log(`Usando API mock: ${mockUrl}`);
    
    const mockResponse = await fetch(mockUrl);
    
    if (!mockResponse.ok) {
      throw new Error(`Erro ao buscar perfil: ${mockResponse.status}`);
    }
    
    const data = await mockResponse.json();
    console.log(`Perfil carregado da API mock: ${data.profile.displayName} (${data.profile.id})`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}
