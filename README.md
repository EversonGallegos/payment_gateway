# Payment Gateway

## Instalação

1. Clone do projeto [https://github.com/EversonGallegos/payment_gateway.git]
2. Executar o container docker com "docker compose up -d" no terminal
3. Baixar as dependências do projeto com "yarn install"
4. Gerar as migrations do prisma com "npx prisma migrate dev --name init"
5. Executar o servidor com "yarn dev"

## Tecnologias Utilizadas

- **Fastify**: Framework web para Node.js, conhecido por sua performance e baixa sobrecarga.
- **TypeScript**: Linguagem de programação que adiciona tipos estáticos ao JavaScript.
- **Docker**: Plataforma de software para criar, implantar e executar aplicativos em contêineres.
- **Zod**: Biblioteca de validação de esquemas escrita em TypeScript.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional de código aberto.
- **Prisma**: Ferramenta de banco de dados para Node.js e TypeScript.
- **Swagger**: Estrutura de ferramentas para projetar, criar e documentar APIs RESTful.

## Scripts

### dev

- **tsnd**: Inicia o ts-node-dev, que é uma ferramenta para desenvolvimento TypeScript que permite reinicialização automática do servidor Node.js sempre que arquivos são modificados.
- **params**:
  --respawn: Esta opção indica que o ts-node-dev deve reiniciar o processo do Node.js quando necessário, por exemplo, após uma modificação nos arquivos.
  --transpile-only: Esta opção instrui o TypeScript a apenas transpilar o código TypeScript para JavaScript, sem realizar checagem de tipos. Isso pode melhorar significativamente o tempo de compilação, especialmente em projetos grandes.
  --exit-child: Esta opção indica que o processo filho (o processo do Node.js) deve ser encerrado quando o processo principal (o ts-node-dev) terminar. Isso garante que todos os processos relacionados sejam encerrados adequadamente.

## Documentação da API

- /docs
