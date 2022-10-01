import { useContext, useEffect } from "react";
import { SubscriptionInfo } from "types";
import { NaverMapsContext } from "components/NaverMaps";

interface Props {
  subscriptionLocation?: Array<SubscriptionInfo>;
}

export default function Markers({ subscriptionLocation }: Props) {
  const naverMaps = useContext(NaverMapsContext);

  const renderMarker = () => {
    if (!subscriptionLocation?.length || !naverMaps) return;
    subscriptionLocation.forEach((info) => {
      new naver.maps.Marker({
        map: naverMaps,
        position: info.좌표,
        icon: {
          url: "https://i.ibb.co/f0k0wk9/homeLH.png",
          scaledSize: new naver.maps.Size(20, 20),
        },
      });
    });
  };

  useEffect(() => {
    renderMarker();
  }, [subscriptionLocation, naverMaps]);
  return <></>;
}
