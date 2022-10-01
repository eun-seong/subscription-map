import loadEnvironment from "./loadEnvironment";

const env = {
  NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID: loadEnvironment(
    "NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID"
  ),
  NEXT_PUBLIC_NAVER_MAPS_CLIENT_SECRET: loadEnvironment(
    "NEXT_PUBLIC_NAVER_MAPS_CLIENT_SECRET"
  ),
};

export default env;
