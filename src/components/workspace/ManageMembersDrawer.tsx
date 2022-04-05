import { Avatar, Button, Divider, Drawer, List, message } from "antd";
import { Input } from "antd";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useUsersByKeysQuery } from "../../firebase/database/users-collection";
import { useMembersQuery } from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import useWorkspaceRoleDisplayName from "../../hooks/workspace/useWorkspaceRoleDisplayName";
import { WorkspaceRole } from "../../types/workspace-types";
import { PopupProps } from "../common/shared-types";
import { UserInfo } from "../common/user-data";
const { Search } = Input;
const ManageMembersDrawer: FC<PopupProps & { workspaceId: string }> = ({
  visible,
  close,
  workspaceId,
}) => {
  const { userData } = useUserData();
  const { members, loading } = useMembersQuery(workspaceId);
  const { users } = useUsersByKeysQuery(members?.map((x) => x.userId));
  const { getRoleDisplayName } = useWorkspaceRoleDisplayName();
  const [filter, setFilter] = useState("");
  const onRemoveMember = (member: WorkspaceRole, user: UserInfo) => {
    deleteDoc(member.ref).then(() =>
      message.success(`Removed member ${user.displayName}`)
    );
  };
  const onAssignAdmin = (member: WorkspaceRole, user: UserInfo) => {
    updateDoc(member.ref, { role: "admin" }).then(() =>
      message.success(`Assigned administrator role to ${user.displayName}`)
    );
  };
  const onRemoveAdmin = (member: WorkspaceRole, user: UserInfo) => {
    updateDoc(member.ref, { role: "normal" }).then(() =>
      message.success(`Removed administrator role for ${user.displayName}`)
    );
  };
  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Manage Members"
      size="large"
    >
      <Search
        placeholder="Search user by name"
        onChange={(e) => {
          setFilter(e.target.value.toLowerCase());
        }}
      ></Search>
      <Divider type="horizontal" />
      <List
        loading={loading}
        dataSource={members}
        renderItem={(member) => {
          const user = users.find(
            (x) =>
              x.id === member.userId &&
              x.displayName.toLowerCase().includes(filter)
          );
          if (user === undefined) return null;
          const extraActions = [];
          if (member.role === "admin") {
            extraActions.push(
              <Button
                type="text"
                danger
                onClick={() => onRemoveAdmin(member, user)}
              >
                Remove Administrator Role
              </Button>
            );
          } else if (member.role === "normal") {
            extraActions.push(
              <Button type="link" onClick={() => onAssignAdmin(member, user)}>
                Assign Adminstrator
              </Button>
            );
          }
          return (
            <List.Item
              actions={
                user.id === userData?.id
                  ? []
                  : [
                      ...extraActions,
                      <Button
                        type="text"
                        onClick={() => onRemoveMember(member, user)}
                      >
                        Remove
                      </Button>,
                    ]
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<AiOutlineUser />} />}
                title={user?.displayName}
                description={getRoleDisplayName(member.role)}
              />
            </List.Item>
          );
        }}
      ></List>
    </Drawer>
  );
};
export default ManageMembersDrawer;
