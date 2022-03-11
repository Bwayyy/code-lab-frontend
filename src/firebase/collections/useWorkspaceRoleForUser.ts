import { collection, query, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import useFirestoreRefPath from "../../hooks/useFirestoreRefPath";
import useUserData from "../../hooks/useUserData";
import {
  setWorkspaceRoleForUser,
  setWorkspaceRoles,
} from "../../reducers/workspaceSlice";
import { WorkspaceRole } from "../../types/workspace-types";
import { fireStore } from "../firebaseApp";

export default function useWorkspaceRoleForUser(workspaceId?: string) {
  const { userData } = useUserData();
  const dispatch = useDispatch();
  const { getWorkspaceMemberRoleCollectionPath } = useFirestoreRefPath();
  const [roles, loading, error] = useCollectionData(
    workspaceId
      ? query(
          collection(
            fireStore,
            getWorkspaceMemberRoleCollectionPath(workspaceId)
          ),
          where("userId", "==", userData?.id)
        )
      : undefined,
    { idField: "id", refField: "ref" }
  );
  const role: WorkspaceRole | undefined = useMemo(
    () =>
      roles?.map((x) => ({
        id: x.id,
        userId: x.userId,
        role: x.role,
        ref: x.ref,
      }))[0],
    [roles]
  );
  useEffect(() => {
    if (role) {
      dispatch(setWorkspaceRoleForUser(role));
    }
  }, [role]);
  return { roleObj: role, isAdmin: role?.role === "admin" };
}
