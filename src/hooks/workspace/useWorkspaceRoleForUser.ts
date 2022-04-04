import { useSelector } from "react-redux";
import {} from "../../reducers/workspaceSlice";
import { RootState } from "../../store";

export default function useWorkspaceRoleForUser(workspaceId?: string) {
  const membership = useSelector(
    (state: RootState) => state.workspaces.currentMembership
  );
  const role = membership?.role;
  return { role: role, isAdmin: role === "admin" };
}
