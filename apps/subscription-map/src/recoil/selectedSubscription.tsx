import { atom } from "recoil";
import { LocationsByAddress, SubScriptionType } from "types";

type Type = {
  id?: SubScriptionType["id"];
  data?: LocationsByAddress;
  filter?: (data: LocationsByAddress) => LocationsByAddress | null;
};

const selectedSubscription = atom<Type>({
  key: "selectedSubscription",
  default: { id: undefined },
});

export default selectedSubscription;
