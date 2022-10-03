import { useState } from "react";
import { styled } from "@stitches/react";

import { colors } from "ui/styles";

interface Props extends Partial<Omit<HTMLInputElement, "width" | "height">> {
  width?: number | string;
}

export default function SearchInput({ width, ...inputProps }: Props) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleFocusInput() {
    setFocused(true);
  }
  function handleBlurInput() {
    setFocused(false);
  }
  function handleMouseEnterInput() {
    setHovered(true);
  }
  function handleMouseLeaveInput() {
    setHovered(false);
  }

  return (
    <Container
      style={{ width }}
      border={focused ? "focused" : hovered ? "hover" : "none"}
      onMouseEnter={handleMouseEnterInput}
      onMouseLeave={handleMouseLeaveInput}
    >
      <ImgContainer>
        <Img src="https://subscription-map.s3.ap-northeast-2.amazonaws.com/assets/search-icon.svg" />
      </ImgContainer>
      <Input
        {...inputProps}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
      />
    </Container>
  );
}

const Container = styled("div", {
  boxSizing: "border-box",
  display: "flex",
  width: 200,
  alignItems: "center",
  border: "none",
  outline: "none",
  height: "48px",
  position: "relative",
  "&::before": {
    borderRadius: "10px",
    overflow: "hidden",
    transition:
      "background .2s ease, color .1s ease, box-shadow .2s ease, border .2s ease",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    content: "",
    pointerEvents: "none",
  },
  variants: {
    border: {
      none: {
        "&::before": {
          boxShadow: `inset 0 0 0 1px ${colors.greyOpacity200}`,
        },
      },
      hover: {
        "&::before": {
          boxShadow: `inset 0 0 0 2px ${colors.blue200}`,
        },
      },
      focused: {
        "&::before": {
          boxShadow: `inset 0 0 0 2px ${colors.blue500}`,
        },
      },
    },
  },
});
const ImgContainer = styled("div", {
  boxSizing: "border-box",
  width: "20px",
  height: "20px",
  marginLeft: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Img = styled("img", {
  width: "13px",
  height: "13px",
});
const Input = styled("input", {
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  border: "none",
  padding: "0 12px",
  "&:focus": {
    outline: "none",
  },
});
