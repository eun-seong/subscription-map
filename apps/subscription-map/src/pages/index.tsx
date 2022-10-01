import { InferGetStaticPropsType } from "next";
import { SubscriptionInfo } from "types";

import Markers from "components/Markers";
import NaverMaps from "components/NaverMaps";

export default function Index({
  subscriptionLocations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NaverMaps>
        <Markers subscriptionLocations={subscriptionLocations} />
      </NaverMaps>
    </>
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
