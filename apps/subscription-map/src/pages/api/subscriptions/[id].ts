import { NextApiRequest, NextApiResponse } from "next";
import XLSX from "xlsx";

import { AddressItemV2, NaverMapsDeocodingReponse } from "types/naverMaps";
import env from "utils/env";
import { URL_VALUE } from "constants/index";
import { SubscriptionInfo, Subscriptions, SubscriptionXlsxData } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const url =
      "https://subscription-map.s3.ap-northeast-2.amazonaws.com/subscriptions/2209_22년_3차_청년매입임대_서울지역본부.xlsx";
    const file = await (await fetch(url)).arrayBuffer();
    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const result = XLSX.utils.sheet_to_json<Array<string | number>>(worksheet, {
      header: 1,
      range: 8,
    });

    const transformedData = (
      await Promise.all(
        result
          .filter((row) => !!row[5])
          .map(async (row) => {
            const goecodingRes: NaverMapsDeocodingReponse = await fetch(
              URL_VALUE.naverMapsGeoCoding + `?query=${row[5]}`,
              {
                method: "get",
                headers: {
                  "X-NCP-APIGW-API-KEY-ID":
                    env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID,
                  "X-NCP-APIGW-API-KEY":
                    env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_SECRET,
                },
              }
            ).then((data) => data.json());

            return {
              address: goecodingRes.addresses?.[0],
              주소: row[5],
              동: typeof row[6] === "number" ? row[6].toString() : row[6],
              호: typeof row[7] === "number" ? row[7].toString() : row[7],
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
                  보증금최대전환시: {
                    임대보증금: row[21],
                    전환율: row[22],
                    월임대료: row[23],
                  },
                },
                "2,3": {
                  기본임대조건: {
                    임대보증금: row[24],
                    월임대료: row[25],
                  },
                  보증금최대전환시: {
                    임대보증금: row[26],
                    전환율: row[27],
                    월임대료: row[28],
                  },
                },
              },
            } as unknown as Omit<SubscriptionInfo, "좌표"> & {
              address: AddressItemV2;
            };
          })
      )
    ).reduce((res, location) => {
      const element = {
        ...location,
        주소: location.address.roadAddress,
        좌표: {
          x: +location.address.x,
          y: +location.address.y,
        },
      } as unknown as SubscriptionInfo;
      return {
        ...res,
        [location.address.roadAddress]: {
          주소: location.address.roadAddress,
          건물이름: location.건물이름,
          승강기: location.승강기,
          좌표: {
            x: +location.address.x,
            y: +location.address.y,
          },
          list: [...(res?.[location.address.roadAddress]?.list || []), element],
        },
      };
    }, {} as Subscriptions);
    return res.status(200).json(transformedData);
  }
}
