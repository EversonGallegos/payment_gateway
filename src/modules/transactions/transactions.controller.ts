import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionCreateInput, createTransactionSchema } from "./transaction.schema";
import { createTransaction, getAllTransactions, getTransactionsByID, getTransactionsByMethod } from "./transactions.services";
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

export async function getTransactionsHandler( request: FastifyRequest<{
  Querystring: {
    id?: number,
    method?: 'pix' | 'credit_card'
  }
}>, reply: FastifyReply ) {
  const query = request.query;
  let transactions = null;
  
  if(query?.id){
    transactions = await getTransactionsByID(query.id);
    if(!transactions) return reply.code(404).send({ message: 'Transaction not found'});
    return reply.code(200).send([transactions]);
  }

  if(query?.method) {
    transactions = await getTransactionsByMethod(query.method);
    if(!transactions.length) return reply.code(204).send({ message: 'Transactions not found'});
    return reply.code(200).send(transactions);
  }

  transactions = await getAllTransactions();
  if(!transactions.length) return reply.code(204).send({ message: 'Transactions not found'});
  return reply.code(200).send(transactions);
}