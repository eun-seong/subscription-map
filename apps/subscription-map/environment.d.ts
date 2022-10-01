declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID: string;
      NEXT_PUBLIC_NAVER_MAPS_CLIENT_SECRET: string;
      PORT: number;
    }
  }
}
