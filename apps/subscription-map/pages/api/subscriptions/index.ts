import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") {
    return res.status(200).json([
      {
        id: 1,
        title: "2022년 3차 청년매입임대주택 - 서울",
        url: "https://subscription-map.s3.ap-northeast-2.amazonaws.com/2209_22년_3차_청년매입임대_서울지역본부.xlsx",
      },
    ]);
  }
}
