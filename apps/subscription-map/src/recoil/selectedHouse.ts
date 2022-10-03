import { atom } from "recoil";
import { HousesByAddress } from "types";

const selectedHouse = atom<HousesByAddress | null>({
  key: "selectedHouse",
  default: null,
});

export default selectedHouse;
