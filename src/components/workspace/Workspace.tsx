import {
  Button,
  Col,
  Divider,
  List,
  message,
  PageHeader,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { Moment } from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLiveCodingCollection from "../../firebase/collections/useLiveCodingCollection";
import useAssignmentMutation from "../../hooks/assignments/useAssignmentMutation";
import useAssignments from "../../hooks/assignments/useAssignments";
import useLiveCodingMutation from "../../hooks/live-coding/useLiveCodingMutation";
import usePopup from "../../hooks/usePopup";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import useWorkspaceRoleForUser from "../../hooks/workspace/useWorkspaceRoleForUser";
import { setCurrentAssignment } from "../../reducers/assignmentSlice";
import { setCurrentLiveCodingRoom } from "../../reducers/liveCodingSlice";
import { RootState } from "../../store";
import { Assignment } from "../../types/assignment-types";
import { LiveCodingRoom } from "../../types/live-coding-types";
import { AssignemntInfoDrawer } from "./AssignmentInfoDrawer";
import { LiveCodingInfoDrawer } from "./LiveCodingInfoDrawer";

export const Workspace: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMoment } = useMomentFormat();
  const liveCodingPopup = usePopup();
  const assignmentPopup = usePopup();
  const { id } = useParams();
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { isAdmin } = useWorkspaceRoleForUser(workspace?.id);
  const { threads } = useLiveCodingCollection(id ?? "");
  const { assignments } = useAssignments();
  const { remove } = useLiveCodingMutation();
  const { remove: removeAssignment } = useAssignmentMutation();
  if (!workspace) {
    return <span>No Workspace Selected</span>;
  }
  const onEnterRoomClick = (item: LiveCodingRoom) => {
    dispatch(setCurrentLiveCodingRoom(item));
    navigate(`liveCoding/${item.id}`);
  };
  const onAddLiveCoding = () => {
    liveCodingPopup.showPopup("add");
  };
  const onRemoveLiveCoding = async (ref: DocumentReference) => {
    await remove(ref);
    message.success("The Live Coding Room is removed");
    liveCodingPopup.closePopup();
  };
  const onEnterAssignmentClick = (item: Assignment) => {
    dispatch(setCurrentAssignment(item));
    if (isAdmin) {
      navigate(`assignment/grading/${item.id}`);
    } else {
      navigate(`assignment/${item.id}`);
    }
  };
  const onAddAssignment = () => {
    assignmentPopup.showPopup("add");
  };
  const onRemoveAssignment = async (ref: DocumentReference) => {
    await removeAssignment(ref);
    message.success("The Assignment is removed");
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
                        isAdmin ? (
                          <Button
                            onClick={() =>
                              liveCodingPopup.showPopup("edit", item)
                            }
                            disabled={!isAdmin}
                          >
                            Edit
                          </Button>
                        ) : null,
                        <Button
                          type="primary"
                          onClick={() => onEnterRoomClick(item)}
                        >
                          Enter
                        </Button>,
                        isAdmin ? (
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => onRemoveLiveCoding(item.ref)}
                          >
                            <Button danger type="primary" disabled={!isAdmin}>
                              Close
                            </Button>
                          </Popconfirm>
                        ) : null,
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
                  <Button type="primary" onClick={() => onAddAssignment()}>
                    Add Assessment
                  </Button>
                ) : null
              }
            >
              <List
                dataSource={assignments}
                renderItem={(item: Assignment) => {
                  return (
                    <List.Item
                      actions={[
                        isAdmin ? (
                          <Button
                            onClick={() =>
                              assignmentPopup.showPopup("edit", item)
                            }
                          >
                            Edit
                          </Button>
                        ) : null,
                        <Button
                          type="primary"
                          onClick={() => onEnterAssignmentClick(item)}
                        >
                          {isAdmin ? "View & Grade" : "Detail"}
                        </Button>,
                        isAdmin ? (
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => onRemoveAssignment(item.ref)}
                          >
                            <Button danger type="primary">
                              Close
                            </Button>
                          </Popconfirm>
                        ) : null,
                      ]}
                    >
                      <Row
                        style={{ width: "100%" }}
                        align="middle"
                        justify="space-between"
                      >
                        <Col md={12} xs={24}>
                          <List.Item.Meta
                            title={item.name}
                            description={
                              <div
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.objective}
                              </div>
                            }
                          />
                        </Col>
                        <Col md={12} xs={24}>
                          <Typography.Text strong>
                            Deadline: {formatMoment(item.deadline as Moment)}
                          </Typography.Text>
                        </Col>
                      </Row>
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
      <AssignemntInfoDrawer
        form={assignmentPopup.form}
        action={assignmentPopup.action}
        visible={assignmentPopup.visible}
        close={assignmentPopup.closePopup}
      />
    </>
  );
};
