import { atom } from "recoil";
import { SubscriptionData } from "types";

const selectedHouse = atom<SubscriptionData | null>({
  key: "selectedHouse",
  default: null,
});

export default selectedHouse;
