import { collection, documentId, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { Workspace } from "../../types/workspace-types";
import useUserData from "../../hooks/useUserData";
import { setWorkspaces } from "../../reducers/workspaceSlice";
import { fireStore } from "../firebaseApp";
export default function useWorkspaceCollection() {
  const dispatch = useDispatch();
  // const { userData } = useUserData();
  // const [workspaceRoles] = useCollectionDataOnce(
  //   query(
  //     collection(fireStore, "workspace_roles"),
  //     where("userId", "==", userData?.id)
  //   )
  // );
  const [snapshot, loading, error] = useCollectionDataOnce(
    query(collection(fireStore, "workspaces")),
    {
      idField: "id",
    }
  );
  const workspaces = snapshot?.map(
    (x) =>
      ({
        createdAt: x.createdAt,
        createdBy: x.createdBy,
        description: x.description,
        id: x.id,
        name: x.name,
      } as Workspace)
  );
  useEffect(() => {
    if (workspaces) {
      dispatch(setWorkspaces(workspaces));
    }
  }, [workspaces]);
  return {
    workspaces,
    loading,
    error,
  };
}
