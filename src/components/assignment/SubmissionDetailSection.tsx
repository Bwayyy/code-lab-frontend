import { Button, Descriptions } from "antd";
import { StorageReference } from "firebase/storage";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import useAssignmentSubmissionFiles from "../../hooks/assignments/useAssignmentSubmissionFiles";
import useStorageFileUtils from "../../hooks/useStorageFileUtils";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import { RootState } from "../../store";
import { AssignmentSubmission } from "../../types/assignment-types";
type SubmissionDetailSectionProps = {
  submission?: AssignmentSubmission;
};
export const SubmissionDetailSection: FC<SubmissionDetailSectionProps> = ({
  submission,
}) => {
  const { downloadFile } = useStorageFileUtils();
  const { formatTimeStamp } = useMomentFormat();
  const { submissionFiles } = useAssignmentSubmissionFiles(submission);
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const submissionDisplayValue = useMemo(() => {
    if (submission) {
      return {
        submitted: "Yes",
        graded: submission.graded ? "Yes" : "No",
        submitted_at: submission
          ? formatTimeStamp(submission.submitted_at)
          : "-",
        score: submission?.score
          ? `${submission.score} / ${assignment?.maxScore}`
          : "Not Available yet",
      };
    }
  }, [submission]);
  return (
    <Descriptions title="Submission Status" column={2} layout="vertical">
      {submissionDisplayValue ? (
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
            {submissionFiles?.map((ref) => (
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
  );
};
