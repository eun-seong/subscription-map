import { SubscriptionData } from "types";

import { Tag } from "ui/components";
import { styled } from "ui/styles";

interface Props {
  info: SubscriptionData;
}

export default function SubscriptionInfoWindow({ info }: Props) {
  return (
    <Container>
      <Title>{info.건물이름}</Title>
      <Text>{info.주소}</Text>
      <Tag type="teal">
        총 <b>{info.list.length}</b> 세대 공급
      </Tag>
    </Container>
  );
}

const Container = styled("div", {
  maxWidth: 300,
  padding: "15px",
  backgroundColor: "rgba(47, 47, 47, 0.8)",
  borderRadius: 10,
  color: "white",
  lineHeight: "1.4rem",
});

const Title = styled("div", {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: 5,
});

const Text = styled("div", {
  fontSize: "0.9rem",
});
