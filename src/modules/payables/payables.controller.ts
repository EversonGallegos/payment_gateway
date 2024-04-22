import { TransactionCreateResponseInput } from "../transactions/transaction.schema";
import getDynamicFields from "./helpers/get_dynamic_fields";
import { createPayable } from "./payables.services";

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