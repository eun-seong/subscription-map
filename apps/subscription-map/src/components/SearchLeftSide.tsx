import { SearchInput } from "ui/components";
import SideMenuLayout from "./SideMenuLayout";

export default function SearchLeftSide() {
  return (
    <SideMenuLayout layoutPosition="left">
      <SearchInput placeholder="주소 혹은 건물명을 입력하세요" width="100%" />
    </SideMenuLayout>
  );
}
