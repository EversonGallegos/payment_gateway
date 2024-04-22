import 'dotenv/config';
import server from '../src/app';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { describe } from 'node:test';


describe('Testar as rotas do módulo transactions', () => {
  
  let prisma: PrismaClient;
  let container: StartedPostgreSqlContainer;

   beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    
    const urlConnection = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}?schema=public`;
    
    process.env.DATABASE_URL = urlConnection;
    
    execSync('npx prisma db push', {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    });

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    });
  });

  // Teste para a rota GET /payable/
  it('Deve obter todos os payables', async () => {
    // Simule uma solicitação GET para a rota /payable/
    const response = await server.inject({
      method: 'GET',
      url: '/payable/',
    });

    // Verifique se a resposta tem o status 200 OK
    expect(response.statusCode).toBe(200);
    // Verifique se a resposta contém a propriedade 'payableResponseSchema'
    expect(response.json()).toHaveProperty('payableResponseSchema');
  });

  // Teste para a rota PUT /payable/paid
  it('Deve alterar o status de pagamento do recebível para paid', async () => {
    // Insira um payable de teste no banco de dados
    const payable = await prisma.payable.create({
      data: {
        id: 1,
        status: 'waiting_funds',
        // Outros campos do payable...
      },
    });

    // Simule uma solicitação PUT para a rota /payable/paid
    const response = await server.inject({
      method: 'PUT',
      url: '/payable/paid',
      payload: {
        id: payable.id,
      },
    });

    // Verifique se a resposta tem o status 200 OK
    expect(response.statusCode).toBe(200);
  });

  // Teste para a rota GET /payable/balance
  it('Deve obter balanços dos recebíveis', async () => {
    // Insira payables de teste no banco de dados
    await prisma.payable.createMany({
      data: [
        { status: 'paid', amount: 1000 },
        { status: 'waiting_funds', amount: 500 },
      ],
    });

    // Simule uma solicitação GET para a rota /payable/balance
    const response = await server.inject({
      method: 'GET',
      url: '/payable/balance',
    });

    // Verifique se a resposta tem o status 200 OK
    expect(response.statusCode).toBe(200);
    // Verifique se a resposta contém as propriedades 'available' e 'waiting_funds'
    expect(response.json()).toHaveProperty('available');
    expect(response.json()).toHaveProperty('waiting_funds');
  });

  // Teste para a rota POST /transaction/
  it('Deve criar uma transação', async () => {
    // Simule uma solicitação POST para a rota /transaction/
    const response = await server.inject({
      method: 'POST',
      url: '/transaction/',
      payload: {
        // Dados da transação...
      },
    });

    // Verifique se a resposta tem o status 201 Created
    expect(response.statusCode).toBe(201);
    // Verifique se a resposta contém a propriedade 'createTransactionResponseSchema'
    expect(response.json()).toHaveProperty('createTransactionResponseSchema');
  });

  // Teste para a rota GET /transaction/
  it('Deve obter a lista de transações', async () => {
    // Insira transações de teste no banco de dados
    await prisma.transaction.createMany({
      data: [
        { method: 'pix', amount: 1000 },
        { method: 'credit_card', amount: 500 },
      ],
    });

    // Simule uma solicitação GET para a rota /transaction/
    const response = await server.inject({
      method: 'GET',
      url: '/transaction/',
    });

    // Verifique se a resposta tem o status 200 OK
    expect(response.statusCode).toBe(200);
    // Verifique se a resposta contém a propriedade 'transactionsResponseSchema'
    expect(response.json()).toHaveProperty('transactionsResponseSchema');
  });
});
