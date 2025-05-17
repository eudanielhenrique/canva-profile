import type { NextApiRequest, NextApiResponse } from 'next';

// Dados de exemplo baseados em perfis reais do Canva
const mockProfiles: Record<string, any> = {
  'mahcreare': {
    id: "BADv4-Dl7G4",
    brandname: "mahcreare",
    displayName: "Mah Avezani",
    contributor: true,
    layoutContributor: false,
    thirdParty: false,
    creationDate: 1578330000000,  // 2020-01-07
    status: "A",
    avatar: {
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
      }
    }
  },
  'phdanielhenrique': {
    id: "BACa965hCfg",
    brandname: "phdanielhenrique",
    displayName: "Daniel Henrique",
    contributor: true,
    layoutContributor: false,
    thirdParty: false,
    creationDate: 1499816348000,
    status: "A",
    avatar: {
      sizes: {
        "200": {
          size: 200,
          width: 200,
          height: 200,
          url: "https://static.canva.com/images/default_avatar_200.png"
        }
      }
    }
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  
  if (!username || Array.isArray(username)) {
    return res.status(400).json({ error: 'Nome de usuário inválido' });
  }

  // Simulando pequeno delay de rede
  setTimeout(() => {
    // Verificar se temos dados mockados para este username
    if (mockProfiles[username]) {
      // Criar a resposta bruta como seria retornada pelo Canva
      const profileData = mockProfiles[username];
      const rawResponse = `)]}'while(1);</x>//${JSON.stringify(profileData)}`;
      
      return res.status(200).json({
        profile: profileData,
        rawResponse: rawResponse
      });
    } else {
      // Gerar um perfil fictício com dados realistas
      const mockProfile = {
        id: `BA${Math.random().toString(36).substring(2, 8)}`,
        brandname: username,
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
        contributor: Math.random() > 0.5,
        layoutContributor: false,
        thirdParty: false,
        creationDate: Date.now() - Math.floor(Math.random() * 31536000000),
        status: "A",
        avatar: {
          sizes: {
            "200": {
              size: 200,
              width: 200,
              height: 200,
              url: "https://static.canva.com/images/default_avatar_200.png"
            }
          }
        }
      };
      
      const rawResponse = `)]}'while(1);</x>//${JSON.stringify(mockProfile)}`;
      
      return res.status(200).json({
        profile: mockProfile,
        rawResponse: rawResponse
      });
    }
  }, 300);
}
