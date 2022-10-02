import { SubscriptionInfo } from "types";

import { Descriptions, ExpandableList, Tag } from "ui/components";
import { styled } from "ui/styles";

interface Props {
  house: SubscriptionInfo;
}

export default function HouseInfo({ house }: Props) {
  return (
    <ExpandableList
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Tags>
              <Tag type="default">{house.공급형}</Tag>
              <Tag type="red">{house.성별구분}</Tag>
            </Tags>
            {[
              house.층수 && `${house.층수?.replace("층", "")}층`,
              house.동 && `${house.동?.replace("동", "")}동`,
              house.호 && `${house.호?.replace("호", "")}호`,
            ].join(" ")}
          </div>
          <전용면적>{house.전용면적} m²</전용면적>
        </div>
      }
    >
      <House>
        <SubTitle>면적</SubTitle>
        <Descriptions
          items={[
            {
              label: "주거공용면적",
              content: house.주거공용면적,
              unit: "m²",
            },
            {
              label: "전용면적",
              content: house.전용면적,
              unit: "m²",
            },
            { label: "면적계", content: house.면적계, unit: "m²" },
          ]}
        />

        {Object.entries(house.순위별조건).map(([key, value]) => (
          <>
            <SubTitle>{key}순위 조건</SubTitle>
            {Object.entries(value).map(([name, deposit]) => (
              <Descriptions
                title={name}
                items={Object.entries(deposit).map(([label, content]) => ({
                  label,
                  content:
                    label === "전환율"
                      ? Math.round(+content * 1000) / 10
                      : content.toLocaleString(),
                  unit: label === "전환율" ? "%" : "원",
                }))}
              />
            ))}
          </>
        ))}
      </House>
    </ExpandableList>
  );
}

const House = styled("div", {});
const Tags = styled("span", {
  "&>*": {
    marginRight: 8,
    "&:last-child": {
      marginRight: 8,
    },
  },
});
const SubTitle = styled("div", {
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
  color: "$grey900",
});
const 전용면적 = styled("div", {
  fontSize: "0.9rem",
});
