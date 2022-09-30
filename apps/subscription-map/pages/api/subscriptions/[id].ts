import { NextApiRequest, NextApiResponse } from "next";
import XLSX from "xlsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const url =
      "https://subscription-map.s3.ap-northeast-2.amazonaws.com/2209_22년_3차_청년매입임대_서울지역본부.xlsx";
    const file = await (await fetch(url)).arrayBuffer();
    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const result = XLSX.utils.sheet_to_json<Array<unknown>>(worksheet, {
      header: 1,
      range: 8,
    });

    return res.status(200).json(
      result.map((row) => ({
        주소: row[5],
        동: row[6],
        호: row[7],
        건물이름: row[8],
        공급형: row[10],
        성별구분: row[11],
        전용면적: row[12],
        주거공용면적: row[13],
        면적계: row[14],
        방수: row[15],
        층수: row[16],
        승강기: row[17] === "Y" ? true : false,
        주택유형: row[18],
        순위별조건: {
          1: {
            기본임대조건: {
              임대보증금: row[19],
              월임대료: row[20],
            },
            보증금최대전환: {
              임대보증금: row[21],
              전환율: row[22],
              월임대료: row[23],
            },
          },
          "2,3": {
            기본임대조건: {
              임대보증금: row[24],
              월임대료: row[225],
            },
            보증금최대전환: {
              임대보증금: row[26],
              전환율: row[27],
              월임대료: row[28],
            },
          },
        },
      }))
    );
  }
}
