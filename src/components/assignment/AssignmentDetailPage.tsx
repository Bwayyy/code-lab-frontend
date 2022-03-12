import { Button, Descriptions, PageHeader, Space, Upload } from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Moment } from "moment";
import { FC, useMemo } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import useAssignmentSubmission from "../../hooks/assignments/useAssignmentSubmission";
import useAssignmentUpload from "../../hooks/assignments/useAssignmentUpload";
import useStorageFileUtils from "../../hooks/useStorageFileUtils";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import { RootState } from "../../store";

export const AssignmentDetailPage: FC = () => {
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const { files, setFiles, submitFiles } = useAssignmentUpload();
  const { submission, submissionFiles } = useAssignmentSubmission();
  const { formatMoment } = useMomentFormat();
  const { downloadFile } = useStorageFileUtils();
  const submissionDisplayValue = useMemo(() => {
    if (submission) {
      return {
        submitted: "Yes",
        graded: submission.graded ? "Yes" : "No",
        submitted_at: submission
          ? formatMoment(moment(submission.submitted_at.toMillis()))
          : "-",
        score: submission?.score
          ? `${submission.score} / ${assignment?.maxScore}`
          : "Not Available yet",
      };
    }
  }, [submission]);
  return assignment ? (
    <Space direction="vertical">
      <PageHeader
        title={
          <span>
            Assignment <b>123123</b> in {workspace?.name}
          </span>
        }
      />
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
      <Descriptions title="Submission Status" column={2} layout="vertical">
        {submission ? (
          <>
            <Descriptions.Item label="Submitted">
              {submissionDisplayValue?.submitted}
            </Descriptions.Item>
            <Descriptions.Item label="Submitted at">
              {submissionDisplayValue?.submitted_at}
            </Descriptions.Item>
            <Descriptions.Item label="Graded">
              {submissionDisplayValue?.graded}
            </Descriptions.Item>
            <Descriptions.Item label="Score">
              {submissionDisplayValue?.score}
            </Descriptions.Item>
            <Descriptions.Item label="Submission Files">
              {submissionFiles.map((ref) => (
                <Button type="link" onClick={() => downloadFile(ref)}>
                  {ref.name}
                </Button>
              ))}
            </Descriptions.Item>
          </>
        ) : (
          <span>You have no submission</span>
        )}
      </Descriptions>
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
  ) : null;
};