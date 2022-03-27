import { useSelector } from "react-redux";
import {} from "../../reducers/workspaceSlice";
import { RootState } from "../../store";

export default function useWorkspaceRoleForUser(workspaceId?: string) {
  const memberships = useSelector(
    (state: RootState) => state.workspaces.memeberships
  );
  const membership = memberships.find((x) => x.workspaceId === workspaceId);
  const role = membership?.role;
  return { roleObj: role, isAdmin: role === "admin" };
}
