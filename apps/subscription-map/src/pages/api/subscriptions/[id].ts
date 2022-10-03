import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const { id } = req.query;
    if (!id || Number.isNaN(+id))
      return res.status(400).json({ message: "id값이 필요합니다" });

    const transformedData = await prisma.house.findMany({
      where: {
        subscriptionId: +id,
      },
    });
    return res.status(200).json(transformedData);
  }
}
