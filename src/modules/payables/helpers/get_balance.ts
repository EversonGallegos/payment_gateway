import { Payable } from "@prisma/client";

export function getBalance ( payables: Payable[]): number {
  const balance = payables.reduce((previous, current) => {
    return previous + (current.amount - current.fee);
  }, 0)
  return balance;
}