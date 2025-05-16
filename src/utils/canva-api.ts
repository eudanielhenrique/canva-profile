import { CanvaProfileResponse } from '../types/canva';

export async function fetchCanvaProfile(username: string): Promise<CanvaProfileResponse> {
  try {
    const response = await fetch(`/api/canva-profile/${username}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erro ao buscar perfil: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verificar se temos o ID correto para debug
    console.log(`Perfil recebido para ${username}:`, data);
    
    return data;
  } catch (error) {
    console.error('Erro detalhado:', error);
    throw error;
  }
}
