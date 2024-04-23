import 'dotenv/config';
import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify';
import payablesRoutes from './modules/payables/payables.route';
import transactionsRoutes from './modules/transactions/transactions.route';
import { transactionSchemas } from './modules/transactions/transaction.schema';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { payableSchemas } from './modules/payables/payables.schema';


function buildFastify (): FastifyInstance {

  const server = Fastify({
    logger: true
  });
  
  //Documentation
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Payment Gateway API',
        description: 'Documentação da API do gateway de pagamento',
        version: '0.1.0'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    hideUntagged: false,
  })
  
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
  
  for(const schema of [...transactionSchemas, ...payableSchemas]) {
    server.addSchema(schema);
  }
  
  // Registering routes
  server.register(payablesRoutes, {
    prefix: '/payable'
  })
  
  server.register(transactionsRoutes, {
    prefix: '/transaction'
  })
  //
  
  const port: number = 3000;
  const host: string = '127.0.0.1';
  
  const opts: FastifyListenOptions = {
    port,
    host
  }
  
  server.listen(opts, function (err, address) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
  });

  return server
}

buildFastify();

export default buildFastify