import React from "react";
import { styled } from "./theme";

interface Props {
  title?: string;
  items: Array<{
    label: string | number;
    content: React.ReactNode;
    unit?: string;
  }>;
}

const Descriptions = ({ title, items }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {items.map((item) => (
        <Item>
          <Label>{item.label}</Label>
          <Content type={item?.unit ? "number" : "default"}>
            <div>{item.content}</div>
            <Unit>{item?.unit}</Unit>
          </Content>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled("div", {
  marginTop: 10,
  marginBottom: 15,
});
const Title = styled("div", {
  fontWeight: "bold",
  color: "$grey800",
});
const Item = styled("div", {
  display: "flex",
  padding: "12px 8px",
  borderTop: "1px solid $grey200",
  "&:last-child": {
    borderBottom: "1px solid $grey200",
  },
});
const Label = styled("div", {
  width: 150,
  color: "$grey500",
  fontSize: "0.96rem",
});
const Content = styled("div", {
  display: "flex",
  flex: 1,
  fontSize: "1.05rem",
  variants: {
    type: {
      default: {},
      number: {
        justifyContent: "flex-end",
      },
    },
  },
});
const Unit = styled("div", {
  marginLeft: 10,
  fontSize: "0.85rem",
});

export default Descriptions;
