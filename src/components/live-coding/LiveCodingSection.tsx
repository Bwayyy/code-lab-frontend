import { Badge, Button, Row, Space, Spin } from "antd";
import { updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { PresenceProvider } from "y-presence";
import {
  useLiveCodingByKeyQuery,
  useLiveCodingPermissionQuery,
} from "../../firebase/database/livecoding-collection";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import useYjs from "../../hooks/collaborative-editing/useYjs";
import useUserData from "../../hooks/useUserData";
import useWorkspaceRoleForUser from "../../hooks/workspace/useWorkspaceRoleForUser";
import CodeEditor from "./CodeEditor";
import LiveUserListButton from "./LiveUserListButton";
export const LiveCodingSection: FC = () => {
  const [isOfflineEdit, setOfflineEdit] = useState(false);
  const { roomName } = useRoomName();
  const { provider, isReady } = useYjs({ room: roomName });
  const { userData } = useUserData();
  const { workspaceId, liveCodingId } = useParams();
  const { liveCoding } = useLiveCodingByKeyQuery(workspaceId, liveCodingId);
  const { isAdmin } = useWorkspaceRoleForUser(workspaceId);
  const { permission } = useLiveCodingPermissionQuery(
    workspaceId,
    liveCodingId,
    userData?.id
  );
  const StatusBadge = () => {
    if (!liveCoding?.isLive)
      return <Badge color={"grey"} text={"Offline mode"} />;
    if (permission?.write) return <Badge color={"green"} text={"Write mode"} />;
    else return <Badge color={"red"} text={"Read mode"} />;
  };
  return (
    <Spin
      spinning={!isReady}
      tip="We are getting things ready for you! Please wait."
    >
      {isReady ? (
        <PresenceProvider awareness={provider?.awareness}>
          <Row gutter={12} justify="end">
            <Space direction="horizontal">
              <StatusBadge />
              {liveCoding?.isLive ? (
                <Button
                  type="primary"
                  danger
                  disabled={!isAdmin}
                  onClick={() => {
                    if (liveCoding) {
                      const docRef = liveCoding.ref;
                      updateDoc(docRef, { isLive: false });
                    }
                  }}
                >
                  Close Live
                </Button>
              ) : (
                <Button
                  type="primary"
                  shape="round"
                  disabled={!isAdmin}
                  onClick={() => {
                    if (liveCoding) {
                      const docRef = liveCoding.ref;
                      updateDoc(docRef, { isLive: true });
                    }
                  }}
                >
                  Go Live
                </Button>
              )}
              {liveCoding?.isLive ? (
                <LiveUserListButton
                  provider={provider}
                  permission={permission}
                />
              ) : null}
              {!liveCoding?.isLive && isAdmin && !isOfflineEdit ? (
                <Button shape="round" onClick={() => setOfflineEdit(true)}>
                  Start Offline editing
                </Button>
              ) : null}
              {isOfflineEdit ? (
                <Button
                  shape="round"
                  danger
                  onClick={() => setOfflineEdit(false)}
                >
                  End offline editing
                </Button>
              ) : null}
            </Space>
            <CodeEditor
              liveCoding={liveCoding}
              offlineEditing={isOfflineEdit}
            />
          </Row>
        </PresenceProvider>
      ) : null}
    </Spin>
  );
};
