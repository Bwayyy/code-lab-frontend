import { Badge, Button, Col, Drawer, List, Row, Switch } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { FC, useMemo } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { User } from "y-presence";
import { WebsocketProvider } from "y-websocket";
import { updatePermission } from "../../firebase/database/livecoding-collection";
import useLiveCodingUsers from "../../hooks/collaborative-editing/useLiveCodingUsers";
import usePopup from "../../hooks/usePopup";
import useUserData from "../../hooks/useUserData";
import useWorkspaceRoleForUser from "../../hooks/workspace/useWorkspaceRoleForUser";
import {
  LiveCodingUser,
  UserRoomPermissionBody,
} from "../../types/live-coding-types";
export type YjsProps = {
  provider?: WebsocketProvider;
  permission?: UserRoomPermissionBody;
};
const LiveUserListButton: FC<YjsProps> = ({ provider, permission }) => {
  const { workspaceId, liveCodingId } = useParams();
  const { self, others } = useLiveCodingUsers(provider?.awareness, permission);
  const liveUsersPopup = usePopup();
  const { isAdmin } = useWorkspaceRoleForUser(workspaceId);
  const onWritePermissionChange = (checked: boolean, user?: LiveCodingUser) => {
    console.log(user);
    if (user) {
      updatePermission({ workspaceId, liveCodingId }, user.userId, {
        write: checked,
      });
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
  const allUser = [customNameSelf, ...uniqueOthers];
  return (
    <>
      <Badge count={allUser.length}>
        <Button
          type="primary"
          icon={<FiUsers style={{ marginRight: 8 }} />}
          shape="round"
          onClick={() => liveUsersPopup.showPopup("add")}
        >
          Live Users
        </Button>
      </Badge>
      <Drawer
        title="Live Users"
        visible={liveUsersPopup.visible}
        onClose={liveUsersPopup.closePopup}
      >
        <List
          bordered
          header="Current Users"
          dataSource={allUser}
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
                    checked={item?.presence?.permission?.write}
                    onChange={(checked) => {
                      onWritePermissionChange(checked, item.presence);
                    }}
                  />
                </Row>
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </>
  );
};
export default LiveUserListButton;
