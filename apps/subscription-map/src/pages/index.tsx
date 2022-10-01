import { styled } from "@stitches/react";
import { InferGetStaticPropsType } from "next";

import { SubscriptionInfo } from "types";

import Markers from "components/Markers";
import NaverMaps from "components/NaverMaps";
import SearchLeftSide from "components/SearchLeftSide";

export default function Index({
  subscriptionLocations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  function onMarkerClick(info: SubscriptionInfo) {}
  return (
    <Container>
      <section>
        <NaverMaps>
          <Markers
            subscriptionLocations={subscriptionLocations}
            onMarkerClick={onMarkerClick}
          />
        </NaverMaps>
      </section>
      <SearchLeftSide />
    </Container>
  );
}

export async function getStaticProps() {
  const subscriptionLocations: Array<SubscriptionInfo> = await fetch(
    `http://localhost:3000/api/subscriptions/1`
  ).then((res) => res.json());

  return {
    props: { subscriptionLocations }, // will be passed to the page component as props
  };
}

const Container = styled("main", {
  position: "relative",
  display: "flex",
});
