import { styled } from "@stitches/react";
import { InferGetStaticPropsType } from "next";
import { useSetRecoilState } from "recoil";

import { SubscriptionData, SubscriptionInfo, Subscriptions } from "types";

import selectedHouse from "recoil/selectedHouse";

import Markers from "components/Markers";
import NaverMaps from "components/NaverMaps";
import SearchLeftSide from "components/SearchLeftSide";
import SelectedHouseInfoRightSide from "components/SelectedHouseInfoRightSide";

export default function Index({
  subscriptionLocations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const setSelectedHouse = useSetRecoilState(selectedHouse);

  function onMarkerClick(info: SubscriptionData) {
    setSelectedHouse(info);
  }

  return (
    <Container>
      <SearchLeftSide />
      <div style={{ flex: 1, height: "100%" }}>
        <NaverMaps>
          <Markers
            subscriptionLocations={subscriptionLocations}
            onMarkerClick={onMarkerClick}
          />
        </NaverMaps>
      </div>
      <SelectedHouseInfoRightSide />
    </Container>
  );
}

export async function getStaticProps() {
  const subscriptionLocations: Subscriptions = await fetch(
    `http://localhost:3000/api/subscriptions/1`
  ).then((res) => res.json());

  return {
    props: { subscriptionLocations }, // will be passed to the page component as props
  };
}

const Container = styled("main", {
  position: "relative",
  display: "flex",
  height: "100vh",
});
