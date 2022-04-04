import { Button, Descriptions, PageHeader, Space, Upload } from "antd";
import { Moment } from "moment";
import { FC } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useAssignmentDocByIdQuery,
  useSubmissionDocByIdQuery,
} from "../../firebase/database/assignment-collection";
import { useWorkspaceDocQuery } from "../../firebase/database/workspace-collection";
import useAssignmentUpload from "../../hooks/assignments/useAssignmentUpload";
import useUserData from "../../hooks/useUserData";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import { SubmissionDetailSection } from "./SubmissionDetailSection";

export const AssignmentDetailPage: FC = () => {
  const { workspaceId, assignmentId } = useParams();
  const { files, setFiles, submitFiles } = useAssignmentUpload();
  const { userData } = useUserData();
  const { workspace } = useWorkspaceDocQuery(workspaceId);
  const { submission } = useSubmissionDocByIdQuery(
    { workspaceId, assignmentId },
    userData.id
  );
  const { formatMoment } = useMomentFormat();
  const { assignment } = useAssignmentDocByIdQuery({
    workspaceId,
    assignmentId,
  });
  return assignment ? (
    <PageHeader
      title={
        <span>
          Assignment <b>{assignment.name}</b> in {workspace?.name}
        </span>
      }
    >
      <Space direction="vertical">
        <Descriptions
          title="Assignment Infomation"
          size="small"
          layout="vertical"
          column={{ xs: 1, sm: 2, md: 2 }}
        >
          <Descriptions.Item label="Name">{assignment.name}</Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {formatMoment(assignment.deadline as Moment)}
          </Descriptions.Item>
          <Descriptions.Item label="Max. Score" span={2}>
            {assignment.maxScore}
          </Descriptions.Item>
          <Descriptions.Item label="Objective" span={2}>
            {assignment.objective}
          </Descriptions.Item>
        </Descriptions>
        <SubmissionDetailSection
          submission={submission}
        ></SubmissionDetailSection>
        <Descriptions title="Make New Submission">
          <Descriptions.Item>
            <Space direction="vertical">
              <Upload
                style={{ float: "right" }}
                multiple
                customRequest={({ file, onSuccess }) => {
                  onSuccess?.("ok");
                }}
                onChange={({ file, fileList }) => {
                  setFiles(fileList);
                }}
              >
                <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
              </Upload>
              <Button
                type="primary"
                disabled={files.length === 0}
                onClick={() => submitFiles()}
              >
                Submit
              </Button>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </PageHeader>
  ) : null;
};
