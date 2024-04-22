import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionCreateInput, createTransactionSchema } from "./transaction.schema";
import { createTransaction, getTransactions } from "./transactions.services";
import { createPayablesHandler } from "../payables/payables.controller";

export async function transactionCreateHandler (
  request: FastifyRequest<{
    Body: TransactionCreateInput
  }>,
  reply: FastifyReply
) {
  try {
    const data = await createTransactionSchema.parseAsync(request.body);
    const transaction = await createTransaction(data);
    createPayablesHandler(transaction);
    return reply.code(201).send(transaction);
  } catch (error) {
    return reply.code(422).send({ message: 'Invalid request', error });
  }
}

export async function getAllTransactions( request: FastifyRequest, reply: FastifyReply ) {
  const transaction = await getTransactions();
  const code = transaction.length ? 200 : 204;
  reply.code(code).send(transaction);
}