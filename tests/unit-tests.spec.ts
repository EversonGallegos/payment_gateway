import { PaymentStatus } from '@prisma/client'
import { createPayable } from '../src/modules/payables/payables.services'
import { prismaMock } from './singleton' 

test('should create new user ', async () => {
  const date = new Date()
  const payable = {
    id: 1, 
    status: PaymentStatus.paid,
    payment_date: date,
    amount: 1000,
    fee: 200,
    transactionId: 1
  }

  prismaMock.payable.create.mockResolvedValue(payable)

  await expect(createPayable(payable)).resolves.toEqual({
    id: 1, 
    status: PaymentStatus.paid,
    payment_date: date,
    amount: 1000,
    fee: 200,
    transactionId: 1
  })
})
