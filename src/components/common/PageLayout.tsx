import { Layout } from "antd";
import { FC } from "react";
import { AppBreadcrumb } from "./atoms/AppBreadcrumb";
import { HeaderNavBar } from "./HeaderNavBar";
const { Content } = Layout;
export const PageLayout: FC = ({ children }) => {
  return (
    <>
      <Layout>
        <HeaderNavBar />
      </Layout>
      <AppBreadcrumb />
      <Content style={{ margin: "12px 24px" }}>
        <Content style={{ margin: "24px 0px" }}>{children}</Content>
      </Content>
    </>
  );
};
