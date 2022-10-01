import { styled } from "@stitches/react";

import colors from "ui/colors";
import SearchInput from "ui/Inputs/SearchInput";

export default function SearchLeftSide() {
  return (
    <Container>
      <SearchInput placeholder="주소 혹은 건물명을 입력하세요" width="100%" />
    </Container>
  );
}
const Container = styled("section", {
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
  minWidth: 400,
  height: "100%",
  padding: 20,
  borderRight: `1px solid ${colors.grey300}`,
  overflowY: "auto",
  backgroundColor: "white",
});
