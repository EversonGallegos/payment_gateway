import { PaymentStatus } from '@prisma/client'
import { confirmPayablePayment, createPayable, getPayableByID, getPayables, getPayablesByStatus } from '../src/modules/payables/payables.services'
import { prismaMock } from './singleton' 

const date = new Date()

const payable = {
  id: 1, 
  status: PaymentStatus.paid,
  payment_date: date,
  amount: 1000,
  fee: 200,
  transactionId: 1
}

const payables = [
  {
    id: 1, 
    status: PaymentStatus.waiting_funds,
    payment_date: date,
    amount: 4000,
    fee: 300,
    transactionId: 1
  },
  {
    id: 2, 
    status: PaymentStatus.waiting_funds,
    payment_date: date,
    amount: 1050,
    fee: 200,
    transactionId: 2
  },
  {
    id: 3, 
    status: PaymentStatus.paid,
    payment_date: date,
    amount: 5000,
    fee: 200,
    transactionId: 3
  }
]

describe('Testes unitários dos serviços do módulo payable', () => {

  test('Deve criar um recebível ', async () => {
    prismaMock.payable.create.mockResolvedValue(payable)
    await expect(createPayable(payable)).resolves.toEqual(payable)
  })

  test('Deve obter um recebível pelo ID', async () => {
    prismaMock.payable.findUnique.mockResolvedValue(payable)

    await expect(getPayableByID(1)).resolves.toEqual(payable)
  })

  test('Deve obter um recebível pelo status', async () => {
    const payablesPaid = payables.filter((p) => p.status === 'paid')
    prismaMock.payable.findMany.mockResolvedValue(payablesPaid)
    await expect(getPayablesByStatus('paid')).resolves.toEqual(payablesPaid)
  })

  test('Deve obter a lista de recebíveis', async () => {
    prismaMock.payable.findMany.mockResolvedValue(payables)
    await expect(getPayables()).resolves.toEqual(payables)
  })

  test('Deve alterar o status de pagamento de um recebível', async () => {
    prismaMock.payable.update.mockResolvedValue(payable)
    await expect(confirmPayablePayment(1)).resolves.toEqual(payable)
  })
})