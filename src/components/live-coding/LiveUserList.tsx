import { Col, List, Row, Switch } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { FC, useMemo } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { User } from "y-presence";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";
import useLiveCodingUsers from "../../hooks/collaborative-editing/useLiveCodingUsers";
import useUserRoomPermissionMutation from "../../hooks/live-coding/useUserRoomPermissionMutation";
import useWorkspaceRoleForUser from "../../hooks/workspace/useWorkspaceRoleForUser";
import { RootState } from "../../store";
import { LiveCodingUser } from "../../types/live-coding-types";
export type YjsProps = { doc?: Doc; provider?: WebsocketProvider };
const LiveUserList: FC<YjsProps> = ({ doc, provider }) => {
  const { self, others } = useLiveCodingUsers(provider?.awareness);
  const { setWritePermission } = useUserRoomPermissionMutation();
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { isAdmin } = useWorkspaceRoleForUser(workspace?.id);
  const onWritePermissionChange = (checked: boolean, user?: LiveCodingUser) => {
    if (user) {
      setWritePermission(user.userId, checked);
    }
  };
  const uniqueOthers = useMemo(() => {
    const notEmpty = others.filter((x) => Object.keys(x).length !== 0 && x.id);
    return notEmpty as User<LiveCodingUser>[];
  }, [others]);
  const customNameSelf: User<LiveCodingUser> = useMemo(() => {
    return {
      ...self,
      presence: {
        ...self.presence,
        userName: `You - ${self.presence.userName}`,
      },
    };
  }, [self]);
  return (
    <List
      header="Current Users"
      dataSource={[customNameSelf, ...uniqueOthers]}
      renderItem={(item: User<LiveCodingUser>) => {
        return (
          <List.Item>
            <Row
              style={{ width: "100%" }}
              gutter={[12, 12]}
              justify="space-between"
            >
              <Col>
                <Avatar
                  size="small"
                  icon={<AiOutlineUser />}
                  style={{ marginRight: 12 }}
                />
                {item?.presence?.selfName ?? item?.presence?.userName}
              </Col>
              <Switch
                disabled={!isAdmin}
                checkedChildren="Write"
                unCheckedChildren="Read"
                checked={item?.presence?.permission.write}
                onChange={(checked) => {
                  onWritePermissionChange(checked, item.presence);
                }}
              />
            </Row>
          </List.Item>
        );
      }}
    ></List>
  );
};
export default LiveUserList;
