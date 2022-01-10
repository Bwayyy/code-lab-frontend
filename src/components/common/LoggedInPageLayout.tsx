import { Layout } from "antd";
import { FC } from "react";
import { HeaderNavBar } from "./HeaderNavBar";
const { Content } = Layout;
export const LoggedInPageLayout: FC = ({ children }) => {
  return (
    <>
      <Layout>
        <HeaderNavBar />
      </Layout>
      <Content style={{ margin: "12px 24px" }}>{children}</Content>
    </>
  );
};
