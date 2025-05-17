import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  
  if (!username || Array.isArray(username)) {
    return res.status(400).json({ error: 'Nome de usuário inválido' });
  }

  try {
    console.log(`Buscando perfil do Canva para: ${username}`);
    
    // Fazer requisição direta para o endpoint do Canva (sem proxy)
    const response = await fetch(`https://www.canva.com/_ajax/profile/names/brands/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      console.error(`Erro na API do Canva: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `Erro ao buscar perfil: ${response.status}`,
        message: `A API do Canva retornou: ${response.statusText}`
      });
    }
    
    // Obter o texto da resposta
    const text = await response.text();
    console.log(`Resposta recebida (primeiros 100 chars): ${text.substring(0, 100)}`);
    
    // Remover o prefixo de segurança exatamente como mencionado
    const cleaned = text.replace(/^\)\]\}',\nwhile\(1\);<\/x>\/\//, '');
    
    try {
      // Fazer parse do JSON limpo
      const data = JSON.parse(cleaned);
      console.log(`Perfil encontrado para ${username} com ID: ${data.id}`);
      
      // Retornar os dados e a resposta bruta para referência
      return res.status(200).json({
        profile: data,
        rawResponse: text
      });
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      return res.status(500).json({ 
        error: 'Erro ao processar resposta do Canva',
        message: 'Não foi possível interpretar os dados do perfil'
      });
    }
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ 
      error: 'Falha na requisição',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
