import { Button, List, PageHeader, Space } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLiveCodingCollection from "../../firebase/collections/useLiveCodingCollection";
import { RootState } from "../../store";
import { LiveCodingRoom } from "../../types/live-coding-types";

export const Workspace: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { threads } = useLiveCodingCollection(id ?? "");
  if (!workspace) {
    return <span>No Workspace Selected</span>;
  }
  const onEnterClick = (item: LiveCodingRoom) => {
    navigate(`liveCoding/${item.id}`);
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <PageHeader title={workspace.name} />
      <List
        dataSource={threads}
        renderItem={(item: LiveCodingRoom) => {
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
    </Space>
  );
};
