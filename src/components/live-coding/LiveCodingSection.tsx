import { Badge, Row, Space, Spin } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { PresenceProvider } from "y-presence";
import { useLiveCodingPermissionQuery } from "../../firebase/database/livecoding-collection";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import useYjs from "../../hooks/collaborative-editing/useYjs";
import useUserData from "../../hooks/useUserData";
import CodeEditor from "./CodeEditor";
import LiveUserListButton from "./LiveUserListButton";
export const LiveCodingSection: FC = () => {
  const { roomName } = useRoomName();
  const { provider, isReady } = useYjs({ room: roomName });
  const { userData } = useUserData();
  const { workspaceId, liveCodingId } = useParams();
  const { permission } = useLiveCodingPermissionQuery(
    workspaceId,
    liveCodingId,
    userData?.id
  );
  return (
    <Spin
      spinning={!isReady}
      tip="We are getting things ready for you! Please wait."
    >
      {isReady ? (
        <PresenceProvider awareness={provider?.awareness}>
          <Row gutter={12} justify="end">
            <Space direction="horizontal">
              {permission?.write ? (
                <Badge color={"green"} text={"Write mode"} />
              ) : (
                <Badge color={"red"} text={"Read mode"} />
              )}
              <LiveUserListButton provider={provider} permission={permission} />
            </Space>
            <CodeEditor />
          </Row>
        </PresenceProvider>
      ) : null}
    </Spin>
  );
};
