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
import { DocumentReference } from "firebase/firestore";
import { Moment } from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import InviteLinkPopover from "./InviteLinkPopover";
import ManageMembersDrawer from "./ManageMembersDrawer";
import { useLiveCodingsQuery } from "../../firebase/database/livecoding-collection";
import {
  deleteAssignment,
  useAssignmentsQuery,
} from "../../firebase/database/assignment-collection";

export const Workspace: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMoment } = useMomentFormat();
  const liveCodingPopup = usePopup();
  const assignmentPopup = usePopup();
  const manageMemberPopup = usePopup();
  const { workspaceId } = useParams();
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { isAdmin } = useWorkspaceRoleForUser(workspace?.id);
  const { liveCodings } = useLiveCodingsQuery(workspaceId ?? "");
  const { assignments } = useAssignmentsQuery(workspace?.id);
  const { remove } = useLiveCodingMutation();
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
    navigate(`assignment/${item.id}`);
  };
  const onAddAssignment = () => {
    assignmentPopup.showPopup("add");
  };
  const onRemoveAssignment = async (ref: DocumentReference) => {
    await deleteAssignment(ref);
    message.success("The Assignment is removed");
  };
  return (
    <>
      <PageHeader
        title={workspace.name}
        extra={
          isAdmin ? (
            <>
              <Button onClick={() => manageMemberPopup.showPopup("add")}>
                Manage Users
              </Button>
              <InviteLinkPopover workspaceId={workspace.id} />
            </>
          ) : null
        }
      >
        <Row gutter={24}>
          <Col span={12}>
            <List
              bordered
              header={
                <Row justify="space-between">
                  <Typography.Title level={5}>Live Codings</Typography.Title>
                  {isAdmin ? (
                    <Button type="primary" onClick={() => onAddLiveCoding()}>
                      Add Live Coding
                    </Button>
                  ) : null}
                </Row>
              }
              dataSource={liveCodings}
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
          </Col>
          <Col span={12}>
            <List
              header={
                <Row justify="space-between">
                  <Typography.Title level={5}>Assessments</Typography.Title>
                  {isAdmin ? (
                    <Button type="primary" onClick={() => onAddAssignment()}>
                      Add Assessment
                    </Button>
                  ) : null}
                </Row>
              }
              bordered
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
          </Col>
        </Row>
      </PageHeader>
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
      <ManageMembersDrawer
        visible={manageMemberPopup.visible}
        close={manageMemberPopup.closePopup}
        workspaceId={workspace.id}
      ></ManageMembersDrawer>
    </>
  );
};
