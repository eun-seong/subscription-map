import React from "react";
import { useSetRecoilState } from "recoil";
import selectedSubscription from "recoil/selectedSubscription";

import { HouseInfo, LocationsByAddress, SubScriptionType } from "types";

import { debounce } from "utils/utils";

import { Select, SearchInput } from "ui/components";
import SideMenuLayout from "./SideMenuLayout";

interface Props {
  subscriptionList?: SubScriptionType[];
}

export default function SearchLeftSide({ subscriptionList }: Props) {
  const setSubscription = useSetRecoilState(selectedSubscription);

  function handleChange(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data: HouseInfo[]) => {
        setSubscription({
          id,
          data: data.reduce((res, house) => {
            return {
              ...res,
              [house.address]: {
                address: house.address,
                buildingName: house.buildingName,
                isElevator: house.isElevator,
                coordinate: {
                  lat: +house.latitude,
                  lon: +house.longitude,
                },
                list: [...(res?.[house.address]?.list || []), house],
              },
            };
          }, {} as LocationsByAddress),
        });
      });
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e?.target?.value);
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
      <SearchInput
        placeholder="주소 혹은 건물명을 입력하세요"
        width="100%"
        onChange={debounce(handleSearchChange)}
      />
    </SideMenuLayout>
  );
}
