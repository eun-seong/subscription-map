import { styled } from "./theme";

const Tag = styled("span", {
  boxSizing: "border-box",
  padding: "0 4px",
  fontSize: "13px",
  fontWeight: "bold",
  borderRadius: 4,
  variants: {
    type: {
      red: {
        backgroundColor: "$red100",
        border: "1px solid $red800",
        color: "$red900",
      },
    },
  },
});

export default Tag;
