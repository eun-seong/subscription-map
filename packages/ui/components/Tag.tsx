import { styled } from "ui/styles";

const Tag = styled("span", {
  boxSizing: "border-box",
  padding: "2px 4px",
  fontSize: "13px",
  fontWeight: "bold",
  borderRadius: 4,
  backgroundColor: "$grey100",
  border: "1px solid $grey800",
  color: "$grey900",
  variants: {
    type: {
      default: {
        backgroundColor: "$grey100",
        border: "1px solid $grey800",
        color: "$grey900",
      },
      red: {
        backgroundColor: "$red100",
        border: "1px solid $red800",
        color: "$red900",
      },
      blue: {
        backgroundColor: "$blue100",
        border: "1px solid $blue800",
        color: "$blue900",
      },
      orange: {
        backgroundColor: "$orange100",
        border: "1px solid $orange800",
        color: "$orange900",
      },
      yellow: {
        backgroundColor: "$yellow100",
        border: "1px solid $yellow800",
        color: "$yellow900",
      },
      purple: {
        backgroundColor: "$purple100",
        border: "1px solid $purple800",
        color: "$purple900",
      },
      teal: {
        backgroundColor: "$teal100",
        border: "1px solid $teal800",
        color: "$teal900",
      },
      green: {
        backgroundColor: "$green100",
        border: "1px solid $green800",
        color: "$green900",
      },
    },
  },
});

export default Tag;
