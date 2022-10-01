import { useContext, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

import { SubscriptionInfo } from "types";

import { NaverMapsContext } from "components/NaverMaps";
import SubscriptionInfoWindow from "./SubscriptionInfoWindow";

interface Props {
  subscriptionLocations?: Array<SubscriptionInfo>;
}

export default function Markers({ subscriptionLocations }: Props) {
  const naverMaps = useContext(NaverMapsContext);
  const markers = useRef<naver.maps.Marker[]>([]);
  const listeners = useRef<naver.maps.MapEventListener[]>([]);

  function updateMarkers(map: naver.maps.Map, markers: naver.maps.Marker[]) {
    const mapBounds = map.getBounds();
    for (const marker of markers) {
      const position = marker.getPosition();
      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  }

  function showMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
    if (marker.setMap(null)) return;
    marker.setMap(map);
  }

  function hideMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
    if (!marker.setMap(null)) return;
    marker.setMap(null);
  }

  function renderMarkers() {
    if (!subscriptionLocations?.length || !naverMaps) return;

    for (const info of subscriptionLocations) {
      const marker = new naver.maps.Marker({
        map: naverMaps,
        position: info.좌표,
        icon: {
          url: "https://subscription-map.s3.ap-northeast-2.amazonaws.com/assets/house-icon-red.svg",
          scaledSize: new naver.maps.Size(16, 16),
        },
        zIndex: 100,
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: ReactDOMServer.renderToStaticMarkup(
          <SubscriptionInfoWindow info={info} />
        ),
        borderWidth: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        anchorSize: new naver.maps.Size(0, 10),
      });

      markers.current.push(marker);
      listeners.current.push(
        naver.maps.Event.addListener(marker, "mouseover", () => {
          infoWindow.open(naverMaps, marker);
        }),
        naver.maps.Event.addListener(marker, "mouseout", () => {
          infoWindow.close();
        }),
        naver.maps.Event.addListener(marker, "click", (e) => {
          if (infoWindow.getMap()) {
            console.log(e);
          }
        })
      );
    }
  }

  useEffect(() => {
    if (!subscriptionLocations?.length || !naverMaps) return;

    renderMarkers();

    const mapListener = naver.maps.Event.addListener(
      naverMaps,
      "idle",
      function () {
        updateMarkers(naverMaps, markers.current);
      }
    );

    return () => {
      naver.maps.Event.removeListener(mapListener);
      for (const listener of listeners.current) {
        naver.maps.Event.removeListener(listener);
      }
    };
  }, [subscriptionLocations, naverMaps]);

  return <></>;
}
