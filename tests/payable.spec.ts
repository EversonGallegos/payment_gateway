import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { FastifyInstance } from 'fastify';
import buildFastify from '../src/app';

describe('Testes unitários dos serviços do módulo payable', () => {
  let app: FastifyInstance
  let prisma: PrismaClient;

 beforeAll(async () => {
    const urlConnection = `postgresql://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@postgres-test:5433/${process.env.DATABASE_NAME}?schema=public`;
    process.env.DATABASE_URL = urlConnection;
    execSync('npx prisma db push', {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    });

    app = buildFastify();

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    });
  });
  
  it('deve criar uma nova transaction', async () => {
    const data = {
      amount: 10000,
      description: "Cafe",
      method: "pix",
      name: "John Dae",
      cpf: "06438279510",
      card_number: "371449635398431",
      valid: 2030,
      cvv: 955
    }
    app.inject({
      method: 'POST',
      url: '/transaction',
      body: JSON.stringify(data)
    }).then(async (response) => {
      const transaction = await prisma.transaction.findFirst();
      expect(response.statusCode).toBe(201);
      expect(transaction?.amount).toBe(10000);
      expect(transaction?.description).toBe("Cafe");
      expect(transaction?.method).toBe("pix");
      expect(transaction?.name).toBe("John Dae");
      expect(transaction?.cpf).toBe("06438279510");
      expect(transaction?.card_number).toBe("8431");
      expect(transaction?.valid).toBe(2030);
      expect(transaction?.cvv).toBe(955);
    })
  })
})