import { Spin } from "antd";
import { FC } from "react";

const LoadingPage: FC<{ text?: string }> = ({ text = "Wait a moment" }) => {
  return (
    <div
      style={{
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip={text} spinning={true}></Spin>
    </div>
  );
};
export default LoadingPage;
