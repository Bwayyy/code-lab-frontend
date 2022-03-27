import { Popover } from "antd";
import { FC } from "react";
import { InputActionType, KeyPressInput } from "./KeyPressInput";
type InputPopoverProps = {
  visible: boolean;
};
export const InputPopover: FC<InputPopoverProps & InputActionType> = ({
  visible,
  onFinish,
  destory,
  children,
}) => {
  return (
    <Popover
      visible={visible}
      placement="left"
      trigger="click"
      destroyTooltipOnHide
      content={
        <KeyPressInput destory={destory} onFinish={onFinish}></KeyPressInput>
      }
    >
      {children}
    </Popover>
  );
};
