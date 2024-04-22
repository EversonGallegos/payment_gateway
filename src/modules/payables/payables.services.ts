import prisma from "../../utils/prisma";
import { PayableCreateInput } from "./payables.schema";

export async function createPayable ( data : PayableCreateInput ) {
  const payable = await prisma.payable.create({ data });
  return payable;
}

export async function getPayables() {
  const payables = await prisma.payable.findMany()
  return payables
}

export async function getPayableByID(id: number) {
  const payable = await prisma.payable.findUnique({
    where: {
      id
    }
  })

  return payable
}

export async function confirmPayablePayment (id: number) {
  const payable = await prisma.payable.update({
    where: {
      id
    },
    data: {
      status: 'paid',
      payment_date: new Date()
    }
  })

  return payable
}

export async function getPayablesByStatus ( status: 'paid' | 'waiting_funds') {
  const payables = await prisma.payable.findMany({
    where: {
      status
    }
  })

  return payables
}