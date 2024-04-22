import { FastifyInstance } from "fastify";
import { transactionCreateHandler, getAllTransactions } from "./transactions.controller";
import { $ref } from "./transaction.schema";

async function transactionsRoutes (server: FastifyInstance) {
  server.post('/', {
    schema: {
      description: 'Criar uma transação',
      body: $ref('createTransactionSchema'),
      response: {
        201: $ref('createTransactionResponseSchema')
      }
    }
  },
   transactionCreateHandler);

  server.get('/', {
    schema: {
      description: 'Obter a lista de transações',
      response:{
        200: $ref('transactionsResponseSchema')
      }
    }
  }, getAllTransactions);
}

export default transactionsRoutes;