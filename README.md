# Canva Profile Viewer

Uma aplicação em Next.js que permite visualizar informações públicas de perfis do Canva, como nome de exibição, username, avatar e outras informações relevantes.

## 📋 Sobre o Projeto

Esta aplicação permite que os usuários:

- Busquem perfis do Canva pelo nome de usuário
- Visualizem informações como ID, nome de exibição, username, status e data de criação
- Vejam a foto de perfil do usuário quando disponível

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações web
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Date-fns](https://date-fns.org/) - Biblioteca para manipulação de datas

## ⚙️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/canva-profile.git
cd canva-profile
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 🔧 Como Usar

1. Na página inicial, digite o nome de usuário do Canva (sem o @) no campo de busca
2. Clique no botão "Buscar Perfil" ou pressione Enter
3. As informações do perfil serão exibidas, incluindo ID, nome, username, status e data de criação
4. Para buscar outro perfil, basta repetir o processo

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React reutilizáveis
├── data/              # Dados mockados para testes
├── pages/             # Páginas da aplicação
│   ├── api/           # API Routes do Next.js
│   └── perfil/        # Página de perfil individual
├── styles/            # Estilos globais
├── types/             # Definições de tipos TypeScript
└── utils/             # Funções utilitárias
```

## 🔍 Recursos Principais

- **Design Responsivo**: Interface adaptável para dispositivos móveis e desktop
- **UI Moderna**: Utiliza TailwindCSS para um design limpo e moderno
- **Acessibilidade**: Implementa práticas de acessibilidade, como texto alternativo para imagens
- **Estado de Carregamento**: Exibe um esqueleto de carregamento (skeleton) durante as requisições
- **Tratamento de Erros**: Tratamento adequado quando um perfil não é encontrado

## 📱 Compatibilidade

A aplicação é compatível com os principais navegadores:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## 🌐 Deploy

Esta aplicação está configurada para fácil deploy na Vercel. Para realizar o deploy:

1. Faça push do código para o GitHub
2. Importe o repositório na Vercel
3. A Vercel detectará automaticamente as configurações do Next.js e realizará o deploy

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

Desenvolvido com ❤️ por [Daniel H](https://www.canva.com/p/phdanielhenrique/)
```

Aproveite a aplicação!
