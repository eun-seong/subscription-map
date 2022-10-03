import { useRecoilValue, useSetRecoilState } from "recoil";

import selectedHouse from "recoil/selectedHouse";
import selectedSubscription from "recoil/selectedSubscription";

import { HousesByAddress } from "types";

import Markers from "components/Markers";
import NaverMaps from "components/NaverMaps";

export default function SubscriptionMap() {
  const subscriptionInfo = useRecoilValue(selectedSubscription);
  const setSelectedHouse = useSetRecoilState(selectedHouse);

  function onMarkerClick(info: HousesByAddress) {
    setSelectedHouse(info);
  }

  return (
    <div style={{ flex: 1, height: "100%" }}>
      <NaverMaps>
        <Markers
          subscriptionLocations={subscriptionInfo.data}
          onMarkerClick={onMarkerClick}
        />
      </NaverMaps>
    </div>
  );
}
