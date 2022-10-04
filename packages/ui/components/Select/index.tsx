import React, { HTMLAttributes, useState } from "react";

import { colors, styled } from "ui/styles";
import { Button } from "ui/components";
import Options, {
  OptionsPosition,
  OptionType,
  OptionValueType,
} from "./Options";
import { TriangleDownIcon } from "ui/icons";

interface Props {
  children: React.ReactNode;
  options?: Array<OptionType>;
  defaultValue?: OptionValueType;
  onChange?: (value: OptionValueType) => void;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
}
type OpenStatus = {
  opened: boolean;
  position?: OptionsPosition;
};

export default function Select({
  children,
  options,
  onChange,
  defaultValue,
  buttonProps,
}: Props) {
  const [openStatus, setOpenStatus] = useState<OpenStatus>({
    opened: false,
  });
  const [selected, setSelected] = useState(defaultValue);

  function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
    // @ts-ignore
    const rect = e.target.closest("button").getBoundingClientRect();
    setOpenStatus((value) => ({
      opened: !value.opened,
      position: {
        top: rect.bottom,
        left: rect.left,
      },
    }));

    buttonProps?.onClick?.(e);
  }

  function handleChange(value: OptionValueType) {
    setOpenStatus({ opened: false });
    if (value === selected) return;

    setSelected(value);
    onChange?.(value);
  }

  return (
    <Container>
      <Button {...buttonProps} onClick={handleOpen}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {selected
              ? options?.find(({ value }) => value === selected)?.label
              : children}
          </div>
          <div style={{ width: 13, height: 13, marginLeft: 12 }}>
            <TriangleDownIcon fill={colors.grey500} />
          </div>
        </div>
      </Button>
      {!!options?.length && openStatus.opened && (
        <Options
          options={options}
          activeOption={selected}
          onChange={handleChange}
          position={openStatus?.position}
        />
      )}
    </Container>
  );
}

const Container = styled("div", {
  position: "relative",
  color: "$grey700",
});
