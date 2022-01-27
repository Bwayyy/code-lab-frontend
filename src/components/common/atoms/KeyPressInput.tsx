import { Input } from "antd";
import { initial } from "lodash";
import { CSSProperties } from "react";
import { FC, useEffect, useState } from "react";

export type InputActionType = {
  initialValue?: string;
  onFinish: (input: string) => any;
  destory: () => any;
  style?: CSSProperties;
};
export const KeyPressInput: FC<InputActionType> = ({
  initialValue,
  destory,
  onFinish,
  style,
}) => {
  const [input, setInput] = useState(initialValue);
  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);
  return (
    <Input
      style={style}
      onBlur={() => destory()}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      autoFocus
      onKeyDown={(e) => {
        console.log({ key: e.key });
        if (e.key === "Enter") {
          onFinish(input ?? "");
        } else if (e.key === "Escape") {
          destory();
        }
      }}
    ></Input>
  );
};
