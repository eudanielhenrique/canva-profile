import type { NextApiRequest, NextApiResponse } from 'next';
import { getMockProfile } from '../../../data/mock-profiles';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;
  
  if (!username || Array.isArray(username)) {
    return res.status(400).json({ error: 'Nome de usuário inválido' });
  }

  try {
    // Usar dados mockados como solução temporária
    const profileData = getMockProfile(username as string);
    
    // Para 'phdanielhenrique', garantir que o ID seja exatamente 'BACa965hCfg'
    if (username === 'phdanielhenrique') {
      profileData.id = 'BACa965hCfg';
    }
    
    // Pequeno delay para simular uma chamada de API real
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Log para debug
    console.log(`Retornando perfil para ${username} com ID: ${profileData.id}`);
    
    return res.status(200).json(profileData);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ 
      error: 'Erro ao buscar dados do perfil',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
