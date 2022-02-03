import { Col, Row } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useFileTabs from "../../hooks/file-directory/useFileTabs";
import CodeEditor from "./CodeEditor";
import LiveUserList from "./LiveUserList";
type LiveCodingSectionProps = {};
export const LiveCodingSection: FC<LiveCodingSectionProps> = ({}) => {
  const { workspaceId, liveCodingId } = useParams();
  return (
    <Row>
      <Col span={4}>
        <LiveUserList
          workspaceId={workspaceId ?? ""}
          liveCodingId={liveCodingId ?? ""}
        />
      </Col>
      <Col span={20}>
        <CodeEditor />
      </Col>
    </Row>
  );
};
