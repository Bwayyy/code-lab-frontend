import { Button, Collapse, List } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWorkspacesForUser from "../../hooks/workspace/useWorkspacesForUser";
import {
  setCurrentMembership,
  setCurrentWorkspace,
} from "../../reducers/workspaceSlice";
import { WorkspaceAndMembership } from "../../types/workspace-types";
export const WorkspaceList: FC = () => {
  const { workspaces, loading } = useWorkspacesForUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEnterClick = (item: WorkspaceAndMembership) => {
    navigate(item.workspace.id);
    dispatch(setCurrentWorkspace(item.workspace));
    dispatch(setCurrentMembership(item.membership));
  };
  return (
    <Collapse>
      <Collapse.Panel key="1" header="Own Workspaces">
        <List
          loading={loading}
          dataSource={workspaces?.filter((x) => x.membership?.role === "admin")}
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
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Joined Workspaces">
        <List
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
      </Collapse.Panel>
    </Collapse>
  );
};
