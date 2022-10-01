import { useContext, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

import { SubscriptionData, Subscriptions } from "types";

import { NaverMapsContext } from "components/NaverMaps";
import SubscriptionInfoWindow from "./SubscriptionInfoWindow";

interface Props {
  subscriptionLocations?: Subscriptions;
  onMarkerClick?: (info: SubscriptionData) => void;
}

export default function Markers({
  subscriptionLocations,
  onMarkerClick,
}: Props) {
  console.log(subscriptionLocations);
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
    if (!subscriptionLocations || !naverMaps) return;

    for (const [address, location] of Object.entries(subscriptionLocations)) {
      const marker = new naver.maps.Marker({
        map: naverMaps,
        position: location.좌표,
        icon: {
          url: "https://subscription-map.s3.ap-northeast-2.amazonaws.com/assets/house-icon-red.svg",
          scaledSize: new naver.maps.Size(26, 26),
        },
        zIndex: 100,
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: ReactDOMServer.renderToStaticMarkup(
          <SubscriptionInfoWindow info={location} />
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
            onMarkerClick?.(location);
          }
        })
      );
    }
  }

  useEffect(() => {
    if (!subscriptionLocations || !naverMaps) return;

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
