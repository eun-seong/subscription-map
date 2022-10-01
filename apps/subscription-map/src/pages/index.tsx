import { InferGetStaticPropsType } from "next";
import { SubscriptionInfo } from "../types";
import Markers from "components/Markers";
import NaverMaps from "components/NaverMaps";
import env from "utils/env";

export default function Index({
  subscriptionLocation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NaverMaps>
        <Markers subscriptionLocation={subscriptionLocation} />
      </NaverMaps>
    </>
  );
}

export async function getStaticProps() {
  const subscriptionLocation: Array<SubscriptionInfo> = await fetch(
    `http://localhost:3000/api/subscriptions/1`
  ).then((res) => res.json());

  return {
    props: { subscriptionLocation }, // will be passed to the page component as props
  };
}
