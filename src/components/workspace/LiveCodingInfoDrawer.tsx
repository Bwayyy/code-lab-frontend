import { Button, Drawer, Input, Space } from "antd";
import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useMemo } from "react";
import useLiveCodingMutation from "../../hooks/live-coding/useLiveCodingMutation";
import { PopupProps } from "../common/shared-types";

export const LiveCodingInfoDrawer: FC<PopupProps> = ({
  form,
  action,
  visible,
  close,
}) => {
  const { create, update } = useLiveCodingMutation();
  const onFinish = () => {
    const values = form?.getFieldsValue(true);
    if (action === "add") {
      create(values);
    } else if (action === "edit") {
      update(values);
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
