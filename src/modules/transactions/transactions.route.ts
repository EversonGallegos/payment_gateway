import { FastifyInstance } from "fastify";
import { transactionCreateHandler, getTransactionsHandler } from "./transactions.controller";
import { $ref } from "./transaction.schema";

async function transactionsRoutes (server: FastifyInstance) {
  server.post('/', {
    schema: {
      description: 'Criar uma transação',
      body: $ref('createTransactionSchema'),
      response: {
        201: $ref('createTransactionResponseSchema')
      },
    }
  },
   transactionCreateHandler);

  server.get('/', {
    schema: {
      description: 'Obter a lista de transações',
      response:{
        200: $ref('transactionsResponseSchema')
      },
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          method: { 
            type: 'string',
            enum: [ 'pix', 'credit_card' ]
          }
        },
        required: []
      }
    }
  }, getTransactionsHandler);
}

export default transactionsRoutes;