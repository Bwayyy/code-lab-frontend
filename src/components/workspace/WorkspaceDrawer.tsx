import { Button, Drawer, Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Timestamp } from "firebase/firestore";
import { FC } from "react";
import {
  addMember,
  createWorkspace,
  updateWorkspace,
} from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import { PopupProps } from "../common/shared-types";

const WorkspaceDrawer: FC<PopupProps> = ({ close, visible, action, form }) => {
  const { userData } = useUserData();
  const onFinish = (values: any) => {
    if (action === "add" && userData) {
      createWorkspace({
        name: values.name,
        createdBy: userData?.id,
        createdAt: Timestamp.now(),
        description: values.description ?? "",
      }).then(async (doc) => {
        const workspaceId = doc.id;
        message.success("Created New Workspace " + values.name);
        await addMember({ userId: userData.id, workspaceId, role: "admin" });
        close();
      });
    } else {
      const workspaceId = form?.getFieldsValue(true).id;
      updateWorkspace(workspaceId, {
        name: values.name,
        description: values.description,
      }).then(() => {
        message.success("Workspace is updated");
        close();
      });
    }
  };
  return (
    <Drawer
      visible={visible}
      onClose={close}
      title={`${action === "add" ? "Create" : "Update"} Workspace`}
      extra={
        <Button type="primary" onClick={() => form?.submit()}>
          {action === "add" ? "Create" : "Update"}
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default WorkspaceDrawer;
