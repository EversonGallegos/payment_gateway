export type PaymentStatus = 'paid' | 'waiting_funds'

export type PaymentMethod = 'pix' | 'credit_card'

type DynamicFields = {
  status: PaymentStatus,
  payment_date: Date,
  fee: number
}

function getDynamicFields ( method: PaymentMethod, amount: number ) : DynamicFields {
  const pixFee = 2.99
  const creditCardFee = 8.99
  const FifteenDaysInMiliseconds = 15 * 24 * 60 * 60 * 1000;
  const calculateFee = (fee: number): number => Math.floor(amount * (fee / 100))

  const getFields: { 
    'pix': DynamicFields,
    'credit_card': DynamicFields } = {
    'pix': {
      status: 'paid',
      payment_date: new Date(),
      fee: calculateFee(pixFee)
    },
    'credit_card': {
      status: 'waiting_funds',
      payment_date: new Date(new Date().getTime() + FifteenDaysInMiliseconds),
      fee: calculateFee(creditCardFee)
    }
  }

  return getFields[method];
}

export default getDynamicFields