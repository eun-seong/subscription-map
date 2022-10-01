import { useState } from "react";
import colors from "ui/colors";
import { CloseIcon } from "ui/icons";

export default function CloseButton(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CloseIcon fill={hovered ? colors.grey600 : colors.grey400} />
    </div>
  );
}
