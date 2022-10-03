import { HouseInfo as HouseInfoType } from "types";

import { Descriptions, ExpandableList, Tag } from "ui/components";
import { styled } from "ui/styles";

interface Props {
  house: HouseInfoType;
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
              <Tag type="default">{house.supplyType}</Tag>
              <Tag type="red">{house.genderType}</Tag>
            </Tags>
            {[
              house?.floors && `${house.floors?.replace("층", "")}층`,
              house?.dong && `${house.dong?.replace("동", "")}동`,
              house?.ho && `${house.ho?.replace("호", "")}호`,
            ].join(" ")}
          </div>
          <전용면적>{house.netLeasableArea} m²</전용면적>
        </div>
      }
    >
      <House>
        <SubTitle>면적</SubTitle>
        <Descriptions
          items={[
            {
              label: "주거공용면적",
              content: house.residentialCommonArea,
              unit: "m²",
            },
            {
              label: "전용면적",
              content: house.netLeasableArea,
              unit: "m²",
            },
            { label: "면적계", content: house.areaSum, unit: "m²" },
          ]}
        />

        {Object.entries(house.rentalTerms).map(([key, value]) => (
          <div key={key}>
            <SubTitle>{key}</SubTitle>
            {Object.entries(value).map(([name, deposit]) => (
              <Descriptions
                key={name}
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
          </div>
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
