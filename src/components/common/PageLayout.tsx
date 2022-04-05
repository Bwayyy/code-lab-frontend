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
      <Content style={{ margin: "12px 24px" }}>
        <AppBreadcrumb />
        {children}
      </Content>
    </>
  );
};
