import { useRecoilState } from "recoil";

import selectedHouseState from "recoil/selectedHouse";

import { styled } from "ui/theme";
import colors from "ui/colors";

import SideMenuLayout from "components/SideMenuLayout";
import CloseButton from "components/buttons/CloseButton";

import { BuildingIcon, LocationIcon, StairsIcon } from "ui/icons";
import Tag from "ui/Tag";
import IconDescription from "ui/IconDescription";
import Descriptions from "ui/Descriptions";

export default function SelectedHouseInfoRightSide() {
  const [selectedHouse, setSelectedHouse] = useRecoilState(selectedHouseState);
  console.log(selectedHouse);

  function handleCloseClick() {
    setSelectedHouse(null);
  }

  if (!selectedHouse) return null;
  return (
    <SideMenuLayout layoutPosition="right">
      <Icon onClick={handleCloseClick} />
      <Header>
        <Title>{selectedHouse.건물이름}</Title>
      </Header>
      <Contents>
        <IconDescription icon={<LocationIcon fill={colors.grey500} />}>
          {selectedHouse.주소}
        </IconDescription>
        <IconDescription icon={<LocationIcon fill={colors.grey500} />}>
          {selectedHouse.승강기 ? "승강기" : "계단"}
        </IconDescription>
        {selectedHouse.list.map((house) => (
          <House>
            <Tags>
              <Tag type="red">{house.공급형}</Tag>
              <Tag type="red">{house.성별구분}</Tag>
            </Tags>
            <IconDescription
              icon={<BuildingIcon fill={colors.grey500} />}
              iconWidth={22}
            >
              {[
                house.층수 && `${house.층수?.replace("층", "")}층`,
                house.동 && `${house.동?.replace("동", "")}동`,
                house.호 && `${house.호?.replace("호", "")}호`,
              ].join(" ")}
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
                      content: content.toLocaleString(),
                      unit: label === "전환율" ? "%" : "원",
                    }))}
                  />
                ))}
              </>
            ))}
          </House>
        ))}
      </Contents>
    </SideMenuLayout>
  );
}

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
});
const Title = styled("h3", {
  fontSize: "1.4rem",
  fontWeight: "bolder",
  wordBreak: "break-all",
});
const SubTitle = styled("div", {
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
  color: "$grey900",
});
const SubSubTitle = styled("div", {
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: 12,
  marginBottom: 8,
  color: "$grey900",
});

const Icon = styled(CloseButton, {
  display: "inline-block",
  position: "absolute",
  top: 15,
  right: 15,
  width: 30,
  height: 30,
  cursor: "pointer",
  "*": {
    transition: "fill .1s ease",
  },
});

const House = styled("div", {
  marginTop: 30,
});

const Tags = styled("div", {
  display: "flex",
  gap: 8,
  margin: "10px 0",
});
const Contents = styled("main", {});
const 주소 = styled("div", {
  color: "$grey600",
});
