export interface NaverMapsResponse {
  status: string;
  meta: Meta;
  errorMessage: string;
}

export interface Meta {
  totalCount: number;
  page: number;
  count: number;
}

export type AddressItemV2 = {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: Array<{
    code: string;
    longName: string;
    shortName: string;
    types:
      | "SIDO"
      | "SIGUGUN"
      | "RI"
      | "ROAD_NAME"
      | "BUILDING_NUMBER"
      | "BUILDING_NAME"
      | "LAND_NUMBER"
      | "POSTAL_CODE";
  }>;
  x: string;
  y: string;
  distance: string;
};

export type NaverMapsDeocodingReponse = NaverMapsResponse & {
  addresses: Array<AddressItemV2>;
};
