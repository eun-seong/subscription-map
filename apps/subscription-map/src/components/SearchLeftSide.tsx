import { styled } from "@stitches/react";

import colors from "ui/colors";
import SearchInput from "ui/Inputs/SearchInput";
import SideMenuLayout from "./SideMenuLayout";

export default function SearchLeftSide() {
  return (
    <SideMenuLayout layoutPosition="left">
      <SearchInput placeholder="주소 혹은 건물명을 입력하세요" width="100%" />
    </SideMenuLayout>
  );
}
