import { Button, Descriptions, PageHeader, Space, Upload } from "antd";
import { Moment } from "moment";
import { FC, useEffect } from "react";
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
import { UploadOutlined } from "@ant-design/icons";
import { setCurrentAssignment } from "../../reducers/assignmentSlice";
import { useDispatch } from "react-redux";
export const AssignmentDetailPage: FC = () => {
  const dispatch = useDispatch();
  const { workspaceId, assignmentId } = useParams();
  const { userData } = useUserData();
  const { workspace } = useWorkspaceDocQuery(workspaceId);
  const { submission } = useSubmissionDocByIdQuery(
    { workspaceId, assignmentId },
    userData?.id
  );
  const { formatMoment } = useMomentFormat();
  const { assignment } = useAssignmentDocByIdQuery({
    workspaceId,
    assignmentId,
  });
  const { files, setFiles, submitFiles, loading } =
    useAssignmentUpload(assignment);
  useEffect(() => {
    if (assignment) {
      dispatch(setCurrentAssignment(assignment));
    }
  }, [assignment]);
  return assignment ? (
    <PageHeader
      title={
        <span>
          Assignment <b className="primary">{assignment.name}</b> in{" "}
          <b className="primary">{workspace?.name}</b>
        </span>
      }
    >
      <Space direction="vertical">
        <Descriptions
          bordered
          title="Assignment Infomation"
          size="small"
          layout="vertical"
          column={{ xs: 1, sm: 2, md: 2 }}
          labelStyle={{ fontWeight: "bold" }}
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
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Button
                type="primary"
                loading={loading}
                disabled={files.length === 0}
                onClick={() =>
                  submitFiles().then(() => window.location.reload())
                }
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
