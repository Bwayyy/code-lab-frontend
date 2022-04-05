import { Descriptions, Modal, Skeleton } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useInvitation from "../../hooks/workspace/useInvitation";
import useWorkspaceDetail from "../../hooks/workspace/useWorkspaceDetail";

const InvitationPage: FC = () => {
  const { workspaceId } = useParams();
  const { join } = useInvitation(workspaceId ?? "");
  const { workspace, loading } = useWorkspaceDetail(workspaceId);
  if (loading) {
    return (
      <Modal visible={true}>
        <span>Please wait a minute...</span>
        <Skeleton active></Skeleton>
      </Modal>
    );
  }
  return (
    <Modal
      visible={true}
      title="You are going to join this workspace"
      onOk={async () => {
        await join();
      }}
      okText="Take me there!"
      cancelText="Deny"
      closable={false}
    >
      <Descriptions size="middle" layout="horizontal" column={1}>
        <Descriptions.Item label="Workspace Name">
          {workspace?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Desciprtion">
          {workspace?.description}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default InvitationPage;
