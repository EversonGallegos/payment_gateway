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
    let data = await createTransactionSchema.parseAsync(request.body);
    let card_number = data.card_number
    if(data.method === 'credit_card' && data.card_number){
      const card_number_length = data.card_number.length ;
      card_number = data.card_number?.slice(card_number_length - 4);
      data = {...data, card_number}
    }
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