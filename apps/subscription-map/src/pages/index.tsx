import { styled } from "@stitches/react";
import { InferGetServerSidePropsType } from "next";

import { SubScriptionType } from "types";

import SearchLeftSide from "components/SearchLeftSide";
import SelectedHouseInfoRightSide from "components/SelectedHouseInfoRightSide";
import SubscriptionMap from "components/SubscriptionMap";

export default function Index({
  subscriptionList,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <Container>
      <SearchLeftSide subscriptionList={subscriptionList} />
      <SubscriptionMap />
      <SelectedHouseInfoRightSide />
    </Container>
  );
}

export async function getStaticProps() {
  const subscriptionList: SubScriptionType[] = await fetch(
    `http://localhost:3000/api/subscriptions`
  ).then((res) => {
    return res.json();});

  return {
    props: { subscriptionList },
  };
}

const Container = styled("main", {
  position: "relative",
  display: "flex",
  height: "100vh",
});
