import React, { createContext, useEffect, useRef, useState } from "react";
import Script from "next/script";

import { URL_VALUE } from "constants/index";

export const NaverMapsContext = createContext<naver.maps.Map | undefined>(
  undefined
);

export default function NaverMaps({ children }: React.PropsWithChildren) {
  const mapsRef = useRef(null);
  const [maps, setMaps] = useState<naver.maps.Map>();

  const initMap = () => {
    const { naver } = window;
    if (!mapsRef.current || !naver) return;

    const map = new naver.maps.Map(mapsRef.current, {
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    });
    setMaps(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <NaverMapsContext.Provider value={maps}>
      <Script
        strategy="beforeInteractive"
        src={`${URL_VALUE.naverMaps}?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID}`}
      ></Script>
      <div
        id="map"
        ref={mapsRef}
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      ></div>
      {children}
    </NaverMapsContext.Provider>
  );
}
