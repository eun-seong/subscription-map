import { useRecoilState } from "recoil";

import selectedHouseState from "recoil/selectedHouse";

import { colors, styled } from "ui/styles";

import SideMenuLayout from "components/SideMenuLayout";
import CloseButton from "components/buttons/CloseButton";
import HouseInfo from "./HouseInfo";

import { ElevatorIcon, LocationIcon } from "ui/icons";
import { Tag, IconDescription, Divider } from "ui/components";

export default function SelectedHouseInfoRightSide() {
  const [selectedHouse, setSelectedHouse] = useRecoilState(selectedHouseState);

  function handleCloseClick() {
    setSelectedHouse(null);
  }

  if (!selectedHouse) return null;
  return (
    <SideMenuLayout layoutPosition="right">
      <Icon onClick={handleCloseClick} />
      <Header>
        <Title>{selectedHouse.buildingName}</Title>
      </Header>
      <main>
        <IconDescription icon={<LocationIcon fill={colors.grey500} />}>
          {selectedHouse.address}
        </IconDescription>
        {typeof selectedHouse.isElevator === "boolean" && (
          <IconDescription icon={<ElevatorIcon fill={colors.grey500} />}>
            {selectedHouse.isElevator ? "승강기 있음" : "승강기 없음"}
          </IconDescription>
        )}
        <Divider />
        <Tags>
          <Tag type="teal">총 {selectedHouse.list.length} 세대 공급</Tag>
        </Tags>
        {selectedHouse.list.map((house) => (
          <HouseInfo key={house.id} house={house} />
        ))}
      </main>
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
const Tags = styled("div", {
  marginBottom: 10,
  "&>*": {
    marginRight: 5,
    "&:last-child": {
      marginRight: 0,
    },
  },
});
