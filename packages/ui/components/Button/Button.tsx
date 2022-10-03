import { colors, styled } from "ui/styles";

const Button = styled("button", {
  height: "48px",
  transition: "all 0.2s ease",
  width: "fit-content",
  borderRadius: "10px",
  padding: "0 18px",

  backgroundColor: "$white",
  color: "$grey700",
  "&:hover": {
    cursor: "pointer",
    boxShadow: `inset 0 0 0 2px ${colors.blue200}`,
  },

  border: "none",
  boxShadow: `inset 0 0 0 1px ${colors.grey200}`,

  variants: {
    type: {
      primary: {
        border: "none",
        boxShadow: `none`,
        backgroundColor: "$blue500",
        color: "$grey50",
        "&:hover": {
          backgroundColor: "$blue700",
          boxShadow: `none`,
        },
      },
      "inverse-primary": {
        border: "none",
        boxShadow: `none`,
        backgroundColor: "$blue100",
        color: "$blue700",
        "&:hover": {
          backgroundColor: "$blue200",
          boxShadow: `none`,
        },
      },
    },
  },
});

export default Button;
