import { Button, DatePicker, Drawer, Input, message, Space } from "antd";
import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Moment } from "moment";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  createAssignemnt,
  updateAssignment,
} from "../../firebase/database/assignment-collection";
import { PopupProps } from "../common/shared-types";

export const AssignemntInfoDrawer: FC<PopupProps> = ({
  form,
  action,
  visible,
  close,
}) => {
  const { workspaceId, assignmentId } = useParams();
  const onFinish = async () => {
    const values = form?.getFieldsValue(true);
    const deadlineTimestamp = Timestamp.fromDate(
      (values.deadline as Moment).toDate()
    );
    const normalized = {
      ...values,
      deadline: deadlineTimestamp,
      maxScore: parseInt(values.maxScore),
    };
    if (action === "add") {
      await createAssignemnt({ workspaceId, assignmentId }, normalized);
      message.success("A new assignment is created");
    } else if (action === "edit") {
      await updateAssignment(normalized);
      message.success("The assignment is updated");
    }
    close();
  };
  const actionText = useMemo(
    () => (action === "add" ? "Creat" : "Save"),
    [action]
  );
  return (
    <Drawer
      visible={visible}
      onClose={close}
      title={`${action === "add" ? "Add New" : "Update"} Assignment`}
      extra={
        <Space>
          <Button type="primary" onClick={() => form?.submit()}>
            {actionText}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="objective"
          label="Objective"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="The object of the assignment" rows={5} />
        </Form.Item>
        <Form.Item
          name="maxScore"
          label="Max. Score"
          rules={[{ required: true }]}
        >
          <Input type="number"></Input>
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Deadline at"
          rules={[
            {
              required: true,
              validator: (_rule, value: Moment) => {
                if (value.isBefore(moment())) {
                  return Promise.reject(
                    new Error("The deadline must be in future")
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <DatePicker showTime defaultValue={moment()}></DatePicker>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
