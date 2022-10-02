import { styled } from "ui/styles";

const SideMenuLayout = styled("section", {
  boxSizing: "border-box",
  maxWidth: 400,
  minWidth: 400,
  height: "100%",
  padding: 20,
  variants: {
    layoutPosition: {
      left: {
        borderRight: `1px solid $grey300`,
      },
      right: {
        borderLeft: `1px solid $grey300`,
      },
    },
  },
  overflowY: "auto",
  backgroundColor: "white",
  lineHeight: "1.4rem",
});

export default SideMenuLayout;
