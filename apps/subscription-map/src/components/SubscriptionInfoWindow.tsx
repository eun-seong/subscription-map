import { styled } from "@stitches/react";
import { SubscriptionInfo } from "types";

interface Props {
  info: SubscriptionInfo;
}

export default function SubscriptionInfoWindow({ info }: Props) {
  return (
    <Container>
      <Title>{info.건물이름}</Title>
      <Address>{info.주소}</Address>
    </Container>
  );
}

const Container = styled("div", {
  maxWidth: 300,
  padding: "15px",
  backgroundColor: "rgba(47, 47, 47, 0.8)",
  borderRadius: 10,
  color: "white",
});

const Title = styled("div", {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: 5,
});

const Address = styled("div", {
  fontSize: "0.9rem",
});
