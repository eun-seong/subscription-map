export type SubScriptionType = {
  id: number;
  year: number;
  month: number;
  title: string;
  fileUrl: string;
};

export type HouseInfo = {
  id: number;
  subscriptionId: number;
  latitude: number; // 경도
  longitude: number; // 위도
  address: string;
  dong?: string; // 동
  ho: string; // 호
  buildingName: string;
  supplyType: string; // 공급형
  genderType: string; // 성별구분
  netLeasableArea: number; // 전용면적
  residentialCommonArea: number; // 주거공용면적
  areaSum: number; // 면적계
  numOfRoom: string; // 방수
  floors: string; // 층수
  isElevator: Boolean; // 승강기 설치 여부
  houseType: string; // 주택유형
  rentalTerms: Record<string, Record<string, Record<string, number>>>; // 임대조건
};

export type HousesByAddress = {
  list: HouseInfo[];
  address: string;
  buildingName: string;
  coordinate: { lat: number; lon: number };
  isElevator: Boolean;
};
export type LocationsByAddress = Record<string, HousesByAddress>;
