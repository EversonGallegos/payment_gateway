import prisma from "../../utils/prisma";
import { PaymentMethod } from "../payables/helpers/get_dynamic_fields";
import { TransactionCreateInput } from "./transaction.schema";

export async function createTransaction ( data: TransactionCreateInput ) {
  const transaction = await prisma.transaction.create({ data });
  return transaction;
}

export async function getAllTransactions () {
  return await prisma.transaction.findMany();
}

export async function getTransactionsByID (id: number) {
  return await prisma.transaction.findUnique({
    where: {
      id
    }
  });
}

export async function getTransactionsByMethod (method: PaymentMethod) {
  return await prisma.transaction.findMany({
    where: {
      method
    }
  });
}