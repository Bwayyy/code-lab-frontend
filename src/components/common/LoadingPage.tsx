import { Spin } from "antd";
import { FC } from "react";

const LoadingPage: FC<{ text: string }> = ({ text }) => {
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
      <Spin tip="Just a moment" spinning={true}></Spin>
    </div>
  );
};
export default LoadingPage;
