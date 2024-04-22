##Payment Gateway

#Stack do projeto:

1. Fastify - Servidor web
2. Typescript - Tipos
3. Docker - 
4. Zod
5. Postgres
6. Prisma
7. Swagger

#Scripts

dev:

- tsnd: Inicia o ts-node-dev, que é uma ferramenta para desenvolvimento TypeScript que permite reinicialização automática do servidor Node.js sempre que arquivos são modificados.
- params:
  --respawn: Esta opção indica que o ts-node-dev deve reiniciar o processo do Node.js quando necessário, por exemplo, após uma modificação nos arquivos.
  --transpile-only: Esta opção instrui o TypeScript a apenas transpilar o código TypeScript para JavaScript, sem realizar checagem de tipos. Isso pode melhorar significativamente o tempo de compilação, especialmente em projetos grandes.
  --exit-child: Esta opção indica que o processo filho (o processo do Node.js) deve ser encerrado quando o processo principal (o ts-node-dev) terminar. Isso garante que todos os processos relacionados sejam encerrados adequadamente.
