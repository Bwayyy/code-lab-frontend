import { Col, Row, Spin } from "antd";
import { FC } from "react";
import { PresenceProvider } from "y-presence";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import useYjs from "../../hooks/collaborative-editing/useYjs";
import CodeEditor from "./CodeEditor";
import LiveUserList from "./LiveUserList";
export const LiveCodingSection: FC = () => {
  const { roomName } = useRoomName();
  const { doc, provider, isReady } = useYjs({ room: roomName });
  return (
    <Spin
      spinning={!isReady}
      tip="We are getting things ready for you! Please wait."
    >
      {isReady ? (
        <PresenceProvider awareness={provider?.awareness}>
          <Row>
            <Col span={4}>
              <LiveUserList doc={doc} provider={provider} />
            </Col>
            <Col span={20}>
              <CodeEditor />
            </Col>
          </Row>
        </PresenceProvider>
      ) : null}
    </Spin>
  );
};
