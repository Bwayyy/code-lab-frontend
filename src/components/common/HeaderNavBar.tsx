import { FC } from "react";
import { Menu, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import { AiOutlineUser } from "react-icons/ai";
import useAuthActions from "../../hooks/useAuthActions";
import { CodeOutlined } from "@ant-design/icons";
export const HeaderNavBar: FC = () => {
  const { userData } = useUserData();
  const { signout } = useAuthActions();
  return (
    <>
      <Header style={{ padding: 0 }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: "bold",
            float: "left",
            padding: "0px 50px",
            color: "rgb(17, 128, 96)",
          }}
        >
          <Space>
            <CodeOutlined />
            Code Classroom
          </Space>
        </span>
        <Menu mode="horizontal" triggerSubMenuAction="click">
          <SubMenu
            icon={<AiOutlineUser />}
            style={{ marginLeft: "auto" }}
            title={`${userData?.displayName}`}
          >
            <Menu>
              <Menu.Item
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </Menu.Item>
            </Menu>
          </SubMenu>
        </Menu>
      </Header>
    </>
  );
};
