import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
import { isValidCPF, isValidCreditCardNumber } from './helpers/validation';

const schemaCore = {
  amount: z.number().int(),
  description: z.string(),
  method: z.enum(['pix', 'credit_card']),
  name: z.string(),
  cpf: z.string().refine((value) => isValidCPF(value)),
  card_number: z.string().optional().nullable(),
  valid: z.number().optional().nullable(),
  cvv: z.number().optional().nullable(),
}

export const createTransactionSchema = z.object({
  ...schemaCore
}).refine((data) => {
  if(data.method === 'credit_card'){
    const isValid = isValidCreditCardNumber(data.card_number as string);
    return !!data.card_number && !!data.valid && !!data.cvv && isValid;
  }
  return true;
}, {
  message: 'CVV, valid must be provided if method is "credit_card" and credit card number must be valid',
  path: []
});

const createTransactionResponseSchema = z.object({
  id: z.number().int(),
  ...schemaCore,
  created_at: z.date()
})

const transactionsResponseSchema = z.array(createTransactionResponseSchema)

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas({
  createTransactionSchema,
  createTransactionResponseSchema,
  transactionsResponseSchema
}, {
  $id: 'transactions'
})

export type TransactionCreateInput = z.infer<typeof createTransactionSchema>
export type TransactionCreateResponseInput = z.infer<typeof createTransactionResponseSchema>
