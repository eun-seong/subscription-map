import React from "react";
import { styled } from "ui/theme";

interface Props {
  icon?: React.ReactNode;
  iconWidth?: number;
  children: React.ReactNode;
}

export default function IconDescription({
  icon,
  iconWidth = 24,
  children,
}: Props) {
  return (
    <Container>
      {icon && (
        <div
          style={{
            width: iconWidth,
            height: iconWidth,
            marginLeft: (24 - iconWidth) / 2,
            marginRight: 10,
            display: "inline-block",
          }}
        >
          {icon}
        </div>
      )}
      <Children>{children}</Children>
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "5px 0",
  fontSize: "0.95rem",
});
const Children = styled("div", {
  wordBreak: "break-all",
});
