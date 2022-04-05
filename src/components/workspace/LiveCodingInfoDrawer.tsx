import { Button, Drawer, Input, Space } from "antd";
import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  addLiveCoding,
  updateLiveCoding,
} from "../../firebase/database/livecoding-collection";
import { LiveCodingRoomBody } from "../../types/live-coding-types";
import { PopupProps } from "../common/shared-types";

export const LiveCodingInfoDrawer: FC<PopupProps> = ({
  form,
  action,
  visible,
  close,
}) => {
  const { workspaceId } = useParams();
  const onFinish = () => {
    const values = form?.getFieldsValue(true);
    const body: LiveCodingRoomBody = {
      name: values.name,
      description: values.description,
      isLive: false,
    };
    if (action === "add") {
      addLiveCoding(workspaceId, body);
    } else if (action === "edit") {
      updateLiveCoding(workspaceId, values.id, body);
    }
    close();
  };
  const actionText = useMemo(
    () => (action === "add" ? "Create" : "Save"),
    [action]
  );
  return (
    <Drawer
      visible={visible}
      onClose={close}
      title={`${action === "add" ? "Add New" : "Update"} Live Coding`}
      extra={
        <Space>
          <Button type="primary" onClick={() => form?.submit()}>
            {actionText}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="Have a brief introduction on the programming project!"
            rows={5}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
