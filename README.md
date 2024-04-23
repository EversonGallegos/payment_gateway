# Payment Gateway

## Instalação

1. Clone do projeto [git clone https://github.com/EversonGallegos/payment_gateway.git]
2. Instalar do docker e ativá-lo
3. Executar o projeto em containers docker com o comando "yarn start"


## Testes

1. Executar o comando "yarn docker:test"

Dois containers docker serão criados. O primeiro com o NodeJS V18 e outro com o postgres. As variáveis de ambiente estão definidas dentro do arquivo docker-compose.yml.

##

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
