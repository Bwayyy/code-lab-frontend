import {
  useMembershipsByUserIdQuery,
  useWorkspacesByKeysQuery,
} from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import { WorkspaceAndMembership } from "../../types/workspace-types";
export default function useWorkspacesForUser() {
  const { userData } = useUserData();
  const { members: memberships, loading: mLoading } =
    useMembershipsByUserIdQuery(userData.id);
  const { workspaces, loading } = useWorkspacesByKeysQuery(
    memberships?.map((x) => x.workspaceId)
  );
  const combined = workspaces?.map((ws) => {
    const membership = memberships?.find((m) => m.workspaceId === ws.id);
    return { workspace: ws, membership } as WorkspaceAndMembership;
  });
  return {
    workspaces: combined,
    loading: mLoading || loading,
  };
}
