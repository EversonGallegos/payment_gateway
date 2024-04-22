import prisma from "../../utils/prisma";
import { PayableCreateInput } from "./payables.schema";

export async function createPayable ( data : PayableCreateInput ) {
  const payable = await prisma.payable.create({ data });
  return payable;
}