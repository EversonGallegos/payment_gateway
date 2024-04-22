import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const schemaCore = {
  amount: z.number().int(),
  description: z.string(),
  method: z.enum(['pix', 'credit_card']),
  name: z.string(),
  cpf: z.string().length(11),
  card_number: z.string().optional().nullable(),
  valid: z.string().optional().nullable(),
  cvv: z.string().optional().nullable(),
}

export const createTransactionSchema = z.object({
  ...schemaCore
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
})

export type TransactionCreateInput = z.infer<typeof createTransactionSchema>