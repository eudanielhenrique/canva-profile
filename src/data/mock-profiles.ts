import { CanvaProfileResponse } from '../types/canva';

// Dados mockados para simular respostas da API do Canva
export const mockProfiles: Record<string, CanvaProfileResponse> = {
  'phdanielhenrique': {
    id: "BACa965hCfg",
    brandname: "phdanielhenrique",
    displayName: "Daniel Henrique",
    personal: false,
    contributor: true,
    layoutContributor: false,
    thirdParty: false,
    brandColor: "63a4a4",
    creationDate: 1499816348000,
    status: "A",
    archived: false,
    externalBrandLinks: [],
    allowedFrameAncestors: [],
    avatar: {
      version: 0,
      sizes: {
        "50": {
          size: 50,
          width: 50,
          height: 50,
          url: "https://static.canva.com/images/default_avatar_50.png"
        },
        "200": {
          size: 200,
          width: 200,
          height: 200,
          url: "https://static.canva.com/images/default_avatar_200.png"
        }
      },
      status: "SUCCEEDED",
      isDefault: true
    }
  },
  'carolinesanches': {
    id: "BAETOYGsa5A",
    brandname: "carolinesanches",
    displayName: "Caroline Sanches",
    personal: false,
    contributor: true,
    layoutContributor: false,
    thirdParty: false,
    creationDate: 1610645439000,
    status: "A",
    archived: false,
    externalBrandLinks: [],
    allowedFrameAncestors: [],
    avatar: {
      version: 0,
      sizes: {
        "50": {
          size: 50,
          width: 50,
          height: 50,
          url: "https://static.canva.com/images/default_avatar_50.png"
        },
        "200": {
          size: 200,
          width: 200,
          height: 200,
          url: "https://static.canva.com/images/default_avatar_200.png"
        }
      },
      status: "SUCCEEDED",
      isDefault: true
    }
  }
};

// Função para buscar perfil mockado ou gerar um perfil aleatório
export function getMockProfile(username: string): CanvaProfileResponse {
  // Se o perfil existir no nosso banco de dados mockado, retorne-o
  if (mockProfiles[username]) {
    return { ...mockProfiles[username] }; // Retorna uma cópia para evitar modificação do original
  }
  
  // Caso contrário, crie um perfil aleatório com ID no formato do Canva
  return {
    id: `${Math.random().toString(36).substring(2, 12)}`, // ID aleatório no formato similar ao do Canva
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
