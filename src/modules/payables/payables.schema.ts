import { z } from "zod";

export const createPayableSchema = z.object({
  status: z.enum(['paid', 'waiting_funds']),
  payment_date: z.date(),
  amount: z.number(),
  fee: z.number(),
  transactionId: z.number()
})

export type PayableCreateInput = z.infer<typeof createPayableSchema>