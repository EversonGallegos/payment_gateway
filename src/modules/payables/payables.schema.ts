import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const payableSchemaBase = {
  status: z.enum(['paid', 'waiting_funds']),
  payment_date: z.date(),
  amount: z.number(),
  fee: z.number(),
  transactionId: z.number()
}

export const createPayableSchema = z.object({
  ...payableSchemaBase
})

export const createPayableResponseSchema = z.object({
  id: z.number().int(),
  ...payableSchemaBase
})

export const payableResponseSchema = z.array(createPayableResponseSchema)

export type PayableCreateInput = z.infer<typeof createPayableSchema>
export type PayableResponse = z.infer<typeof payableResponseSchema>

export const { schemas: payableSchemas, $ref } = buildJsonSchemas({
  payableResponseSchema,
  createPayableSchema,
  createPayableResponseSchema
}, {
  $id: 'payables'
})