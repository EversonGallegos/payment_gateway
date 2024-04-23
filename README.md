# Payment Gateway

## Instalação

1. Clone do projeto [git clone https://github.com/EversonGallegos/payment_gateway.git]
2. Instalar do docker e ativá-lo
3. Configure as variáveis de ambiente. Pode ser usado como base o .env.example.
4. Executar o projeto em containers docker com o comando "yarn start"

## Testes

1. Executar o comando "yarn docker:test" para executar os testes dentro do container docker. 

Obs: o comando deve ser usado após inicialização dos containers com "yarn start"


## Tecnologias Utilizadas

- **Fastify**: Framework web para Node.js, conhecido por sua performance e baixa sobrecarga.
- **TypeScript**: Linguagem de programação que adiciona tipos estáticos ao JavaScript.
- **Docker**: Plataforma de software para criar, implantar e executar aplicativos em contêineres.
- **Zod**: Biblioteca de validação de esquemas escrita em TypeScript.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional de código aberto.
- **Prisma**: Ferramenta de banco de dados para Node.js e TypeScript.
- **Swagger**: Estrutura de ferramentas para projetar, criar e documentar APIs RESTful.
- **Jest**: Framework de teste JavaScript/Typescript.

## Scripts

Recomenda-se usar o yarn para execução dos scripts:

- **start**: Executa o docker compose com todos os containers (nodeJS e postgress);
- **docker:test**: Executa os testes do Jest dentro do container docker do nodeJS
- **dev**: Inicia o servidor localmente usando o ts-node-dev
- **nodemon**: Inicia o servidor localmente usando o nodemon
- **migrate**: Gera as migrations do Prisma
- **migrate:nodemon**: Gera as migrations do Prisma e em sequenquência inicia o nodemon
- **test**: Executa a verredura de testes com o Jest

## Documentação da API

- Após executar o projeto, acessar a rota http://localhost:3000/docs
