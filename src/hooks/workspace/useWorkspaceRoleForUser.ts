import { useUserMemberForWorkspaceQuery } from "../../firebase/database/workspace-collection";
import useUserData from "../useUserData";

export default function useWorkspaceRoleForUser(workspaceId?: string) {
  const { userData } = useUserData();
  const { memberships } = useUserMemberForWorkspaceQuery(
    workspaceId,
    userData?.id
  );
  const membership = memberships?.[0];
  const role = membership?.role;
  return { role: role, isAdmin: role === "admin" };
}
