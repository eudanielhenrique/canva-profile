import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  
  if (!username || Array.isArray(username)) {
    return res.status(400).json({ error: 'Nome de usuário inválido' });
  }

  try {
    console.log(`Buscando perfil do Canva para: ${username}`);
    
    // Headers mais completos para melhor simular um navegador real
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.canva.com/',
      'Origin': 'https://www.canva.com',
      'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"'
    };

    // Tenta usar o proxy allorigins como intermediário
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.canva.com/_ajax/profile/names/brands/${username}`)}`;
    
    console.log('Tentando acessar via proxy:', proxyUrl);
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      console.error(`Erro na requisição ao proxy: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `Erro ao buscar perfil: ${response.status}`,
        message: 'Não foi possível acessar o proxy para obter os dados'
      });
    }

    // O allorigins retorna um formato específico
    const proxyData = await response.json();
    
    if (proxyData.status?.http_code !== 200) {
      return res.status(proxyData.status?.http_code || 500).json({
        error: `Erro ao buscar perfil: ${proxyData.status?.http_code || 'desconhecido'}`,
        message: `O serviço retornou um erro: ${proxyData.status?.message || 'Não foi possível acessar o perfil'}`
      });
    }
    
    // Os dados estão em proxyData.contents como string
    const rawContent = proxyData.contents;
    
    // Verificar se a resposta contém o prefixo do Canva
    if (!rawContent || typeof rawContent !== 'string') {
      return res.status(500).json({
        error: 'Resposta inválida',
        message: 'A resposta do proxy não contém os dados esperados'
      });
    }
    
    // Remover o prefixo de segurança
    const prefixPattern = /^\)\]\}',\nwhile\(1\);<\/x>\//;
    const jsonString = rawContent.replace(prefixPattern, '');
    
    try {
      // Fazer parse do JSON
      const profileData = JSON.parse(jsonString);
      
      // Verificar se é uma mensagem de erro do Canva
      if (profileData.statusCode === 403 || profileData.error) {
        return res.status(403).json({
          error: `Erro ao buscar perfil: ${profileData.error || 'Acesso negado'}`,
          message: `Não foi possível acessar o perfil '${username}'`
        });
      }
      
      console.log(`Perfil encontrado para ${username}:`, {
        id: profileData.id,
        displayName: profileData.displayName,
        brandname: profileData.brandname
      });
      
      // Retornar os dados em formato adequado
      return res.status(200).json({
        profile: profileData,
        rawResponse: rawContent
      });
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError, 'Conteúdo:', rawContent.substring(0, 200));
      return res.status(500).json({ 
        error: 'Erro ao processar resposta',
        message: 'O formato da resposta não é um JSON válido'
      });
    }
  } catch (error) {
    console.error('Erro geral:', error);
    return res.status(500).json({ 
      error: 'Falha na requisição',
      message: error instanceof Error ? error.message : 'Erro desconhecido ao buscar perfil'
    });
  }
}
