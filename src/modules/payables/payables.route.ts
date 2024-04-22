import { FastifyInstance } from "fastify";
import { confirmPayablePaymentHandler, getPayablesHandler, getPayablesBalance } from "./payables.controller";
import { $ref } from "./payables.schema";

async function payablesRoutes (server: FastifyInstance) {
  server.get('/', {
    schema: {
      description: 'Obter todos os payables',
      response: {
        200: $ref('payableResponseSchema')
      },
      querystring: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['paid', 'waiting_funds']
          },
          id: {
            type: 'number'
          },
        },
        required: [],
      },
    }
  }, getPayablesHandler);

  server.put('/paid', {
    schema: {
      description: 'Alterar o status de pagamento do recebível para paid',
      body: {
        type: 'object',
        properties: {
          id: {
            type: 'number'
          }
        },
        required: [
          "id"      
        ]
      }
    }
  }, confirmPayablePaymentHandler)

  server.get('/balance', {
    schema: {
      description: 'Obter balanços dos recebíveis',
      response: {
        200: {
          type: 'object',
          properties: {
            available: {
              type: 'number'
            },
            waiting_funds: {
              type: 'number'
            }
          }
        }
      }
    }
  }, getPayablesBalance)
}

export default payablesRoutes;