import { CanvaProfileResponse } from '../types/canva';

// Dados mockados para simular respostas da API do Canva
export const mockProfiles: Record<string, CanvaProfileResponse> = {
  'phdanielhenrique': {
    id: 'BACa965hCfg', // ID exato da API Canva
    displayName: 'Daniel Henrique',
    brandname: 'phdanielhenrique',
    avatar: {
      sizes: {
        "200": {
          url: 'https://via.placeholder.com/200x200.png?text=DH'
        }
      }
    },
    status: 'active',
    creationDate: '2020-01-15T12:00:00.000Z'
  },
  'canvadesign': {
    id: 'XYZ123abc456', // ID no formato correto
    displayName: 'Canva Design',
    brandname: 'canvadesign',
    avatar: {
      sizes: {
        "200": {
          url: 'https://via.placeholder.com/200x200.png?text=CD'
        }
      }
    },
    status: 'active',
    creationDate: '2012-08-23T10:00:00.000Z'
  },
  'designmaster': {
    id: 'ABC789xyz012', // ID no formato correto
    displayName: 'Design Master',
    brandname: 'designmaster',
    avatar: {
      sizes: {
        "200": {
          url: 'https://via.placeholder.com/200x200.png?text=DM'
        }
      }
    },
    status: 'active',
    creationDate: '2019-03-12T15:30:00.000Z'
  }
};

// Função para buscar perfil mockado ou gerar um perfil aleatório
export function getMockProfile(username: string): CanvaProfileResponse {
  // Se o perfil existir no nosso banco de dados mockado, retorne-o
  if (mockProfiles[username]) {
    return mockProfiles[username];
  }
  
  // Caso contrário, crie um perfil com ID no formato similar ao do Canva
  const randomId = [...Array(11)].map(() => 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
      Math.floor(Math.random() * 62)
    ]
  ).join('');
  
  return {
    id: randomId, // ID no formato similar ao da API do Canva
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    brandname: username,
    avatar: {
      sizes: {
        "200": {
          url: `https://via.placeholder.com/200x200.png?text=${username.slice(0, 2).toUpperCase()}`
        }
      }
    },
    status: 'active',
    creationDate: new Date().toISOString()
  };
}
