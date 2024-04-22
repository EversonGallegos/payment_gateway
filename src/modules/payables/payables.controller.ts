import { TransactionCreateResponseInput } from "../transactions/transaction.schema";
import { getBalance } from "./helpers/get_balance";
import getDynamicFields from "./helpers/get_dynamic_fields";
import { confirmPayablePayment, createPayable, getPayableByID, getPayables, getPayablesByStatus } from "./payables.services";
import { FastifyReply, FastifyRequest } from 'fastify';

export async function createPayablesHandler ( data: TransactionCreateResponseInput ) {
  const { status, payment_date, fee } = getDynamicFields( data.method, data.amount );
  const transactionId = data.id
  const payable =  createPayable({
    amount: data.amount,
    status,
    payment_date,
    fee,
    transactionId
  })
  return payable

}

export async function getPayablesHandler (request: FastifyRequest<{
  Querystring: {
    status?: 'paid' | 'waiting_funds',
    id?: number
  }
}>, reply: FastifyReply) {

  const query = request.query
  let payables = null;

  if(query?.id) {
    payables = await getPayableByID(query.id);
    if (!payables) return reply.code(404).send({ message: 'Payable not found' })
    return reply.code(200).send([payables])
  }

  if(query?.status) {
    payables = await getPayablesByStatus(query.status);
    if(!payables.length) return reply.code(204).send({ message: 'Payables not found' })
    return reply.code(200).send(payables)
  }

  payables = await getPayables();

  if(!payables.length) return reply.code(204).send({ message: 'Payables not found' })
  return reply.code(200).send(payables)
}

export async function confirmPayablePaymentHandler (request: FastifyRequest<{
  Body: {
    id: number
  }
}>, reply: FastifyReply) {
  const data = request.body;
  const payable = await getPayableByID(data.id)
  if(!payable) return reply.code(404).send({ message: 'Payable not found' })
  if(payable.status === 'paid') return reply.code(400).send({ message: 'Payable is already paid' })
  const payableUpdated = await confirmPayablePayment(data.id);
  return reply.code(200).send(payableUpdated)
}

export async function getPayablesBalance (request: FastifyRequest, reply: FastifyReply) {
  const availablePayables = await getPayablesByStatus('paid');
  const waitingFundsPayables = await getPayablesByStatus('waiting_funds');
  const available = getBalance(availablePayables);
  const waiting_funds = getBalance(waitingFundsPayables);
  reply.code(200).send({
    available,
    waiting_funds
  })
}