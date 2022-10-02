import { useRecoilState } from "recoil";

import selectedHouseState from "recoil/selectedHouse";

import { colors, styled } from "ui/styles";

import SideMenuLayout from "components/SideMenuLayout";
import CloseButton from "components/buttons/CloseButton";
import HouseInfo from "./HouseInfo";

import { ElevatorIcon, LocationIcon } from "ui/icons";
import { Tag, IconDescription } from "ui/components";

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
        <Tag type="teal">총 {selectedHouse.list.length} 세대 공급</Tag>
        <IconDescription icon={<LocationIcon fill={colors.grey500} />}>
          {selectedHouse.주소}
        </IconDescription>
        {typeof selectedHouse.승강기 === "boolean" && (
          <IconDescription icon={<ElevatorIcon fill={colors.grey500} />}>
            {selectedHouse.승강기 ? "승강기 있음" : "승강기 없음"}
          </IconDescription>
        )}
        {selectedHouse.list.map((house) => (
          <HouseInfo house={house} />
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
const Contents = styled("main", {});
