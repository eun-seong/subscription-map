import { atom } from "recoil";
import { Subscriptions, SubScriptionType } from "types";

type Type = {
  id?: SubScriptionType["id"];
  data?: Subscriptions;
};

const selectedSubscription = atom<Type>({
  key: "selectedSubscription",
  default: { id: undefined },
});

export default selectedSubscription;
