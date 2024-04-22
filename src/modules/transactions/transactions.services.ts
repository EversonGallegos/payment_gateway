import prisma from "../../utils/prisma";
import { TransactionCreateInput } from "./transaction.schema";

export async function createTransaction ( data: TransactionCreateInput ) {
  const transaction = await prisma.transaction.create({ data });
  return transaction;
}

export async function getTransactions () {
  return await prisma.transaction.findMany();
}