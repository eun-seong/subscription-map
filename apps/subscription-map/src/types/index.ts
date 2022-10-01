export type SubscriptionInfo = {
  주소: string;
  좌표: { x: number; y: number };
  동: string;
  호: string;
  건물이름: string;
  공급형: string;
  성별구분: string;
  전용면적: number;
  주거공용면적: number;
  면적계: number;
  방수: string;
  층수: string;
  승강기: string;
  주택유형: string;
  순위별조건: Record<
    number | string,
    {
      기본임대조건: {
        임대보증금: number;
        월임대료: number;
      };
      보증금최대전환: {
        임대보증금: number;
        전환율: number;
        월임대료: number;
      };
    }
  >;
};