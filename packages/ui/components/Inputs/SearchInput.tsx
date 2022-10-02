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
  borderRadius: "10px",
  border: "none",
  outline: "none",
  transition:
    "background .2s ease, color .1s ease, box-shadow .2s ease, border .2s ease",
  height: "48px",
  overflow: "hidden",
  variants: {
    border: {
      none: { border: `2px solid ${colors.greyOpacity200}` },
      hover: { border: `2px solid ${colors.blue200}` },
      focused: { border: `2px solid ${colors.blue500}` },
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
