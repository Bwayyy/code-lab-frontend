import {
  Button,
  Descriptions,
  Drawer,
  Input,
  List,
  PageHeader,
  Popconfirm,
  Space,
} from "antd";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import useAssignmentSubmissionList from "../../hooks/assignments/admin/useAssignmentSubmissionList";
import usePopup from "../../hooks/usePopup";
import useMomentFormat from "../../hooks/utils/useMomentFormat";
import { RootState } from "../../store";
import { AssignmentSubmission } from "../../types/assignment-types";
import { AssignmentDetailPage } from "./AssignmentDetailPage";
import { SubmissionDetailSection } from "./SubmissionDetailSection";

export const AssignmentGradingPage: FC = ({}) => {
  const { submissions } = useAssignmentSubmissionList();
  const { formatTimeStamp } = useMomentFormat();
  const { showPopup, visible, closePopup } = usePopup();
  const [submission, setSubmission] = useState<AssignmentSubmission>();
  const [score, setScore] = useState(0);
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const finishGrading = () => {};
  return (
    <PageHeader title={"View / Grade Assignment"}>
      <PageHeader title="Submissions">
        <List
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
                description={
                  "Submitted at" + formatTimeStamp(item.submitted_at)
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </PageHeader>
      <Drawer
        title={"Submission from " + submission?.userName}
        visible={visible}
        onClose={closePopup}
      >
        <SubmissionDetailSection submission={submission} />
        <Descriptions title="Grading">
          <Descriptions.Item>
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
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </PageHeader>
  );
};
