import { Button, Col, Collapse, List, Row, Typography } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWorkspaceCollection from "../../firebase/collections/useWorkspaceCollections";
import { setCurrentWorkspace } from "../../reducers/workspaceSlice";
import { Workspace } from "../../types/workspace-types";
export const WorkspaceList: FC = () => {
  const { workspaces } = useWorkspaceCollection();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEnterClick = (item: Workspace) => {
    navigate(item.id);
    dispatch(setCurrentWorkspace(item));
  };
  return (
    <Collapse>
      <Collapse.Panel key="1" header="Own Workspaces">
        <List
          dataSource={workspaces}
          renderItem={(item: Workspace) => {
            return (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => onEnterClick(item)}>
                    Enter
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            );
          }}
        ></List>
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Joined Workspaces">
        {/* <List
          dataSource={joinedWorkspaces}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta title={item.name} description={item.desc} />
              </List.Item>
            );
          }}
        ></List> */}
      </Collapse.Panel>
    </Collapse>
  );
};
