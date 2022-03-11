import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function useUserRoleForWorkspace() {
  const role = useSelector((state: RootState) => state.workspaces.userRole);
  return { isAdmin: role?.role === "admin" };
}
