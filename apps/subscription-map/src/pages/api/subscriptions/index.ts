import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "shared-prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const subscriptions = await prisma.subscription.findMany();
    return res.status(200).json(subscriptions);
  }
}
