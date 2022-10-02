import { colors } from "ui/styles";

export default function Divider() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        backgroundColor: colors.grey200,
        margin: "12px 0",
      }}
    ></div>
  );
}
