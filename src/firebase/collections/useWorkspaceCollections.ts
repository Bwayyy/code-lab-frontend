import { collection, query } from "firebase/firestore";
import { useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { Workspace } from "../../types/workspace-types";
import { setWorkspaces } from "../../reducers/workspaceSlice";
import { fireStore } from "../firebaseApp";
export default function useWorkspaceCollection() {
  const dispatch = useDispatch();
  const [snapshot, loading, error] = useCollectionDataOnce(
    query(collection(fireStore, "workspaces")),
    {
      idField: "id",
      refField: "ref",
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
        ref: x.ref,
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
