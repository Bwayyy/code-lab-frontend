import { Button, Input, Popover, Typography } from "antd";
import { FC, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import useInvitation from "../../hooks/workspace/useInvitation";
type InviteLinkPopoverProps = {
  workspaceId: string;
};
const InviteLinkPopover: FC<InviteLinkPopoverProps> = ({ workspaceId }) => {
  const { invitationLink } = useInvitation(workspaceId);
  return (
    <Popover
      content={
        <>
          <span>Send this link to others</span>
          <Typography.Paragraph copyable={{ text: invitationLink }}>
            <Input
              disabled={true}
              value={invitationLink}
              style={{ width: "calc(100% - 18px)" }}
            ></Input>
          </Typography.Paragraph>
        </>
      }
      placement="left"
      trigger={"click"}
    >
      <Button type="primary" icon={<UserAddOutlined />}>
        Invite People to Workspace
      </Button>
    </Popover>
  );
};
export default InviteLinkPopover;
