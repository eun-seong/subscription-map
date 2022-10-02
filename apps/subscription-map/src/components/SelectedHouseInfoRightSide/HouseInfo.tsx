import { SubscriptionInfo } from "types";

import { Descriptions, IconDescription, Tag } from "ui/components";
import { BuildingIcon } from "ui/icons";
import { styled, colors } from "ui/styles";

interface Props {
  house: SubscriptionInfo;
}

export default function HouseInfo({ house }: Props) {
  return (
    <House>
      <IconDescription
        icon={<BuildingIcon fill={colors.grey500} />}
        iconWidth={22}
      >
        {[
          house.층수 && `${house.층수?.replace("층", "")}층`,
          house.동 && `${house.동?.replace("동", "")}동`,
          house.호 && `${house.호?.replace("호", "")}호`,
        ].join(" ")}
        <Tags>
          <Tag type="default">{house.공급형}</Tag>
          <Tag type="red">{house.성별구분}</Tag>
        </Tags>
      </IconDescription>

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
  );
}

const House = styled("div", {
  marginTop: 30,
});
const Tags = styled("span", {
  margin: "8px 0",
  marginLeft: 8,
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
