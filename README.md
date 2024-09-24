# The-Country-Info-App

Este é um projeto fullstack com um client feito em [Next.js](https://nextjs.org/) e um server construído em [Node.js](https://nodejs.org/). O client é responsável pela interface do usuário, enquanto o servidor lida com a lógica de backend e a API.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/en/download/) (v14 ou superior)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Configuração inicial
### Clone o repositório:

git clone https://github.com/usuario/nome-do-repositorio.git
cd nome-do-repositorio

### Instale as dependências de cada parte (client e server):

**Para o client (Next.js):**

cd client
yarn install

**Para o server (Node.js):**

cd ../server
yarn install

### Configurar variáveis de ambiente:

Se o projeto requer variáveis de ambiente, crie um arquivo .env tanto na pasta client quanto na server, com base nos arquivos de exemplo .env.example (se disponíveis). Por exemplo:

**No diretório client/:**

cp .env.example .env

**No diretório server/:**

cp .env.example .env

### Rodando o projeto

**1. Rodar o server (Node.js)**
No diretório server/, execute o seguinte comando para iniciar o servidor backend:

yarn dev

Por padrão, o servidor será iniciado em http://localhost:3001. Verifique o arquivo .env para a porta correta.

**2. Rodar o client (Next.js)**
No diretório client/, execute o comando para iniciar o servidor de desenvolvimento do Next.js:

yarn dev

O client será iniciado em http://localhost:3000.

**3. Acessar a aplicação**
Agora, você pode acessar a aplicação Next.js no navegador em http://localhost:3000. O client fará as requisições para o servidor backend conforme necessário.
