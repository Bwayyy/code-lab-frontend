import { collection, documentId, query, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { Workspace, WorkspaceRole } from "../../types/workspace-types";
import { setMemberships, setWorkspaces } from "../../reducers/workspaceSlice";
import { fireStore } from "../firebaseApp";
import useFirestoreRefPath from "../../hooks/useFirestoreRefPath";
export default function useWorkspaceCollection() {
  const dispatch = useDispatch();
  const { getWorkspaceMemberCollectionPath } = useFirestoreRefPath();
  const [memberRolesSnapshot] = useCollectionDataOnce(
    query(
      collection(fireStore, getWorkspaceMemberCollectionPath()),
      where("userId", "==", "xbaSSccTHVWVbAWuZc9zPg08pyl2")
    ),
    {
      idField: "id",
      refField: "ref",
    }
  );
  const workspacesIds = useMemo(
    () => memberRolesSnapshot?.map((x) => x.workspaceId),
    [memberRolesSnapshot]
  );
  const [workspacesSnapshot] = useCollectionData(
    workspacesIds
      ? query(
          collection(fireStore, "workspaces"),
          where(documentId(), "in", workspacesIds)
        )
      : null,
    {
      idField: "id",
      refField: "ref",
    }
  );
  const memeberships = memberRolesSnapshot?.map((x) => {
    return {
      id: x.id,
      role: x.role,
      userId: x.userId,
      workspaceId: x.workspaceId,
      ref: x.ref,
    } as WorkspaceRole;
  });
  useEffect(() => {
    if (memeberships) {
      dispatch(setMemberships(memeberships));
    }
  }, [memeberships]);
  const workspaces = workspacesSnapshot?.map(
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
    memeberships,
  };
}
