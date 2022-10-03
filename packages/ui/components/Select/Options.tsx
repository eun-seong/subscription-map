import ReactDOM from "react-dom";
import { colors, styled } from "ui/styles";

export type OptionValueType = string | number;
export type OptionType = {
  label: React.ReactNode;
  value: OptionValueType;
  disabled?: boolean;
};
export type OptionsPosition = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

interface Props {
  options: OptionType[];
  activeOption?: OptionType["value"];
  onChange: (value: OptionValueType) => void;
  position?: OptionsPosition;
}

export default function Options({
  options,
  activeOption,
  onChange,
  position,
}: Props) {
  return ReactDOM.createPortal(
    <OptionsWrapper
      style={{
        position: "absolute",
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        right: position?.right,
      }}
    >
      <List>
        {options.map(({ label, value, disabled }) => (
          <Option
            key={value}
            value={value}
            selected={activeOption === value}
            disabled={disabled}
            onClick={() => onChange(value)}
          >
            {label}
          </Option>
        ))}
      </List>
    </OptionsWrapper>,
    document.querySelector("#__next")
  );
}

const OptionsWrapper = styled("div", {
  minWidth: 120,
  overflowY: "auto",
  borderRadius: 8,
  backgroundColor: "$white",
  margin: "8px 0",
  padding: 8,
  boxShadow: `0 24px 40px 0 ${colors.greyOpacity50},0 16px 24px 0 ${colors.greyOpacity200},0 0 8px 0 ${colors.greyOpacity100}`,
  width: "fit-content",
});
const List = styled("ul", {
  fontSize: "0.9rem",
});
const Option = styled("li", {
  padding: "12px 16px",
  listStyle: "none",
  outline: "none",
  transition: "background-color .2s ease,color .2s ease",
  cursor: "pointer",
  textDecoration: "none",
  borderRadius: 8,
  marginBottom: 2,
  "&:last-child": {
    marginBottom: 0,
  },
  "&:hover": {
    backgroundColor: "$grey100",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$grey100",
        color: "$blue500",
      },
      false: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
});
