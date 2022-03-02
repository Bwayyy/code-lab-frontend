import {
  Button,
  Col,
  Divider,
  List,
  PageHeader,
  Popconfirm,
  Row,
  Space,
} from "antd";
import { DocumentReference } from "firebase/firestore";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLiveCodingCollection from "../../firebase/collections/useLiveCodingCollection";
import useWorkspaceRoles from "../../firebase/collections/useWorkspaceRoles";
import useLiveCodingMutation from "../../hooks/live-coding/useLiveCodingMutation";
import usePopup from "../../hooks/usePopup";
import { RootState } from "../../store";
import { LiveCodingRoom } from "../../types/live-coding-types";
import { LiveCodingInfoDrawer } from "./LiveCodingInfoDrawer";

export const Workspace: FC = () => {
  const navigate = useNavigate();
  const liveCodingPopup = usePopup();
  const assementPopup = usePopup();
  const { id } = useParams();
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { isAdmin } = useWorkspaceRoles(workspace?.id);
  const { threads } = useLiveCodingCollection(id ?? "");
  const { remove } = useLiveCodingMutation();
  if (!workspace) {
    return <span>No Workspace Selected</span>;
  }
  const onEnterClick = (item: LiveCodingRoom) => {
    navigate(`liveCoding/${item.id}`);
  };
  const onAddLiveCoding = () => {
    liveCodingPopup.showPopup("add");
  };
  const onAddAssessment = () => {};
  const onRemoveLiveCoding = async (ref: DocumentReference) => {
    await remove(ref);
    liveCodingPopup.closePopup();
  };
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <PageHeader title={workspace.name} />
        <Row>
          <Col span={11}>
            <PageHeader
              title="Live Codings"
              extra={
                isAdmin ? (
                  <Button type="primary" onClick={() => onAddLiveCoding()}>
                    Add Live Coding
                  </Button>
                ) : null
              }
            >
              <List
                dataSource={threads}
                renderItem={(item: LiveCodingRoom) => {
                  return (
                    <List.Item
                      actions={[
                        <Button
                          onClick={() =>
                            liveCodingPopup.showPopup("edit", item)
                          }
                          disabled={!isAdmin}
                        >
                          Edit
                        </Button>,
                        <Button
                          type="primary"
                          onClick={() => onEnterClick(item)}
                        >
                          Enter
                        </Button>,
                        <Popconfirm
                          title="Are you sure?"
                          onConfirm={() => onRemoveLiveCoding(item.ref)}
                        >
                          <Button danger type="primary">
                            Close
                          </Button>
                        </Popconfirm>,
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
            </PageHeader>
          </Col>
          <Divider type="vertical" />
          <Col span={11}>
            <PageHeader
              title="Assessments"
              extra={
                isAdmin ? (
                  <Button type="primary" onClick={() => onAddAssessment()}>
                    Add Assessment
                  </Button>
                ) : null
              }
            >
              <List
                dataSource={threads}
                renderItem={(item: LiveCodingRoom) => {
                  return (
                    <List.Item
                      actions={[
                        <Button
                          onClick={() => assementPopup.showPopup("edit", item)}
                          disabled={!isAdmin}
                        >
                          Edit
                        </Button>,
                        <Button
                          type="primary"
                          onClick={() => onEnterClick(item)}
                        >
                          Enter
                        </Button>,
                        <Popconfirm
                          title="Are you sure?"
                          onConfirm={() => onRemoveLiveCoding(item.ref)}
                        >
                          <Button danger type="primary">
                            Close
                          </Button>
                        </Popconfirm>,
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
            </PageHeader>
          </Col>
        </Row>
      </Space>
      <LiveCodingInfoDrawer
        form={liveCodingPopup.form}
        action={liveCodingPopup.action}
        visible={liveCodingPopup.visible}
        close={liveCodingPopup.closePopup}
      />
    </>
  );
};
