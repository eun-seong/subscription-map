import { useState } from "react";
import { colors, styled } from "ui/styles";
import { TriangleDownIcon } from "ui/icons";

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  defaultExpanded?: boolean;
  onExpand?: () => void;
  onExtract?: () => void;
}

export default function ExpandableList({
  children,
  title,
  defaultExpanded = false,
  onExpand,
  onExtract,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  function handleTitleClick() {
    setExpanded((value) => {
      if (value) {
        handleExtract();
      } else {
        handleExpand();
      }
      return !value;
    });
  }

  function handleExpand() {
    onExpand?.();
  }
  function handleExtract() {
    onExtract?.();
  }

  return (
    <Container>
      <Title onClick={handleTitleClick}>
        <div style={{ flex: 1, marginRight: 8 }}>{title}</div>
        <ExpandableIcon
          style={{ width: 26, height: 26 }}
          status={expanded ? "expanded" : "extracted"}
        >
          <TriangleDownIcon fill={colors.grey500} />
        </ExpandableIcon>
      </Title>
      <Contents status={expanded ? "expanded" : "extracted"}>
        {children}
      </Contents>
    </Container>
  );
}

const Container = styled("div", {
  boxSizing: "border-box",
  borderRadius: "6px",
  border: `1px solid $greyOpacity200`,
  marginBottom: 10,
  "&:last-child": {
    marginBottom: 0,
  },
  variants: {
    status: {
      expanded: {},
      extracted: {},
    },
  },
});
const Title = styled("div", {
  display: "flex",
  cursor: "pointer",
  padding: "10px 8px",
  justifyContent: "space-between",
  alignItems: "center",
});
const ExpandableIcon = styled("div", {
  transition: "all 0.25s ease-in-out",
  variants: {
    status: {
      expanded: {
        transform: "rotate(0.5turn)",
      },
      extracted: {
        transform: "none",
      },
    },
  },
});
const Contents = styled("div", {
  transition: "all 0.25s ease-in-out",
  overflow: "hidden",
  padding: "0 12px 8px 12px",
  variants: {
    status: {
      expanded: {
        borderTop: `1px solid $greyOpacity200`,
        height: "100%",
      },
      extracted: {
        borderTop: `0px solid $greyOpacity200`,
        padding: "0 12px 0px 12px",
        height: "0px",
      },
    },
  },
});
