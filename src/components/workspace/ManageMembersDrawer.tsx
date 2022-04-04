import { Drawer } from "antd";
import { FC } from "react";
import { useMembersQuery } from "../../firebase/database/workspace-collection";
import { PopupProps } from "../common/shared-types";
const ManageMembersDrawer: FC<PopupProps & { workspaceId: string }> = ({
  visible,
  close,
  workspaceId,
}) => {
  const { members, loading, error } = useMembersQuery(workspaceId);
  return (
    <Drawer visible={visible} onClose={close} title="Manage Members">
      {members?.map((d) => d.userId)}
    </Drawer>
  );
};
export default ManageMembersDrawer;
