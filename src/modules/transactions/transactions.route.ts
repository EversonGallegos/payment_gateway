import { FastifyInstance } from "fastify";
import { transactionCreateHandler, getAllTransactions } from "./transactions.controller";
import { $ref } from "./transaction.schema";

async function transactionsRoutes (server: FastifyInstance) {
  server.post('/', {
    schema: {
      body: $ref('createTransactionSchema'),
      response: {
        201: $ref('createTransactionResponseSchema')
      }
    }
  },
   transactionCreateHandler);
  server.get('/', {
    schema: {
      response:{
        200: $ref('transactionsResponseSchema')
      }
    }
  }, getAllTransactions);
}

export default transactionsRoutes;