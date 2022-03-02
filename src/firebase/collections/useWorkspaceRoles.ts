import { collection, query, where } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import useUserData from "../../hooks/useUserData";
import { WorkspaceRole } from "../../types/workspace-types";
import { fireStore } from "../firebaseApp";

export default function useWorkspaceRoles(workspaceId?: string) {
  const { userData } = useUserData();
  const [roles, loading, error] = useCollectionDataOnce(
    workspaceId
      ? query(
          collection(fireStore, "workspace_roles"),
          where("userId", "==", userData?.id),
          where("workspaceId", "==", workspaceId)
        )
      : undefined,
    { idField: "id", refField: "ref" }
  );
  const role: WorkspaceRole | undefined = roles?.map((x) => ({
    id: x.id,
    userId: x.userId,
    workspaceId: x.workspaceId,
    role: x.role,
    ref: x.ref,
  }))[0];
  return { roleObj: role, isAdmin: role?.role === "admin" };
}
