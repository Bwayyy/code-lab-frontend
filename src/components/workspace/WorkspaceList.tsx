import { Button, Col, List, Row, Space, Typography } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePopup from "../../hooks/usePopup";
import useWorkspacesForUser from "../../hooks/workspace/useWorkspacesForUser";
import {
  setCurrentMembership,
  setCurrentWorkspace,
} from "../../reducers/workspaceSlice";
import { WorkspaceAndMembership } from "../../types/workspace-types";
import WorkspaceDrawer from "./WorkspaceDrawer";
import { PlusOutlined } from "@ant-design/icons";
export const WorkspaceList: FC = () => {
  const { workspaces, loading } = useWorkspacesForUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEnterClick = (item: WorkspaceAndMembership) => {
    navigate(item.workspace.id);
    dispatch(setCurrentWorkspace(item.workspace));
    dispatch(setCurrentMembership(item.membership));
  };
  const createWorkspacePopup = usePopup();
  return (
    <Row style={{ width: "100%" }} gutter={24}>
      <Col span={12}>
        <List
          bordered
          header={
            <Row justify="space-between">
              <Typography.Title level={5}>Own Workspaces</Typography.Title>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={(e) => {
                  createWorkspacePopup.showPopup("add");
                  e.stopPropagation();
                }}
              >
                Create Workspace
              </Button>
            </Row>
          }
          loading={loading}
          dataSource={workspaces?.filter((x) => x.membership?.role === "admin")}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  <Button
                    onClick={() =>
                      createWorkspacePopup.showPopup("edit", item.workspace)
                    }
                  >
                    Edit
                  </Button>,
                  <Button type="primary" onClick={() => onEnterClick(item)}>
                    Enter
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.workspace.name}
                  description={item.workspace.description}
                />
              </List.Item>
            );
          }}
        ></List>
      </Col>
      <Col span={12}>
        <List
          bordered
          header={
            <Typography.Title level={5}>Joined Workspaces</Typography.Title>
          }
          loading={loading}
          dataSource={workspaces?.filter(
            (x) => x.membership?.role === "normal"
          )}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => onEnterClick(item)}>
                    Enter
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.workspace.name}
                  description={item.workspace.description}
                />
              </List.Item>
            );
          }}
        ></List>
      </Col>

      <WorkspaceDrawer
        visible={createWorkspacePopup.visible}
        close={createWorkspacePopup.closePopup}
        action={createWorkspacePopup.action}
        form={createWorkspacePopup.form}
      />
    </Row>
  );
};
