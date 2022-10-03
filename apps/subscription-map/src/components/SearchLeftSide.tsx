import { useSetRecoilState } from "recoil";
import selectedSubscription from "recoil/selectedSubscription";

import { Subscriptions, SubScriptionType } from "types";

import { Select, SearchInput } from "ui/components";
import SideMenuLayout from "./SideMenuLayout";

interface Props {
  subscriptionList?: SubScriptionType[];
}

export default function SearchLeftSide({ subscriptionList }: Props) {
  const setSubscription = useSetRecoilState(selectedSubscription);

  function handleChange(id: number) {
    fetch(`http://localhost:3000/api/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data: Subscriptions) => {
        setSubscription({ id, data });
      });
  }

  return (
    <SideMenuLayout layoutPosition="left">
      <Select
        options={subscriptionList?.map((elem) => ({
          label: elem.title,
          value: elem.id,
        }))}
        buttonProps={{ style: { width: "100%" } }}
        onChange={(id) => handleChange(+id)}
      >
        공고 선택
      </Select>
      <SearchInput placeholder="주소 혹은 건물명을 입력하세요" width="100%" />
    </SideMenuLayout>
  );
}
