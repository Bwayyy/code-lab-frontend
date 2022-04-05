import {
  Alert,
  Button,
  Descriptions,
  Drawer,
  Input,
  List,
  PageHeader,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import moment, { Moment } from "moment";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAssignmentSubmissionsQuery } from "../../firebase/database/assignment-collection";
import usePopup from "../../hooks/usePopup";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import { RootState } from "../../store";
import { AssignmentSubmission } from "../../types/assignment-types";
import { SubmissionDetailSection } from "./SubmissionDetailSection";

export const AssignmentGradingPage: FC = () => {
  const { workspaceId, assignmentId } = useParams();
  const { submissions } = useAssignmentSubmissionsQuery({
    workspaceId,
    assignmentId,
  });
  const { formatTimeStamp } = useMomentFormat();
  const { showPopup, visible, closePopup } = usePopup();
  const [submission, setSubmission] = useState<AssignmentSubmission>();
  const [score, setScore] = useState(0);
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const finishGrading = () => {};
  const isBeforeDeadline = moment().isBefore(assignment?.deadline as Moment);
  return (
    <PageHeader title={"View / Grade Assignment"}>
      <List
        bordered
        header={<Typography.Title level={5}>Submissions</Typography.Title>}
        dataSource={submissions}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => {
                  showPopup("add");
                  setSubmission(item);
                }}
              >
                View
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.userName}
              description={"Submitted at" + formatTimeStamp(item.submitted_at)}
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
      <Drawer
        title={"Submission from " + submission?.userName}
        visible={visible}
        onClose={closePopup}
      >
        <SubmissionDetailSection submission={submission} />
        <Descriptions title="Grading">
          <Descriptions.Item>
            {isBeforeDeadline ? (
              <Alert
                type="error"
                message="Grading is not available before assignment deadline"
              />
            ) : (
              <Space direction="vertical">
                <Input
                  style={{ width: 100 }}
                  type="number"
                  min={0}
                  max={assignment?.maxScore}
                  suffix={"/ " + assignment?.maxScore}
                  value={score}
                  onChange={(e) => {
                    if (assignment) {
                      let value = parseInt(e.target.value);
                      if (value > assignment.maxScore) {
                        value = assignment.maxScore;
                      } else if (value < 0) {
                        value = 0;
                      }
                      setScore(value);
                    }
                  }}
                ></Input>
                <Popconfirm
                  title="Please confirm the score"
                  okText="Grade Now"
                  onConfirm={() => {
                    finishGrading();
                  }}
                  placement="bottom"
                >
                  <Button type="primary">Finish Grading</Button>
                </Popconfirm>
              </Space>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </PageHeader>
  );
};
