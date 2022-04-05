import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  DocumentReference,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import {
  Workspace,
  WorkspaceBody,
  WorkspaceRoleBody,
} from "../../types/workspace-types";
import {
  transformMembership,
  transformWorkspace,
} from "../data-transform/workspace-entity-transform";
import { fireStore } from "../firebaseApp";
export const firestoreFetchOptions = {
  idField: "id",
  refField: "ref",
};
const collections = {
  members: {
    get: () => collection(fireStore, "workspace_members"),
    getDoc: (id: string) => doc(fireStore, collections.members.get().path, id),
  },
  workspaces: {
    get: () => collection(fireStore, "workspaces"),
    getDoc: (id: string) =>
      doc(fireStore, collections.workspaces.get().path, id),
  },
};
export const useWorkspaceDocQuery = (workspaceId?: string) => {
  let docRef = null;
  if (workspaceId) {
    docRef = collections.workspaces.getDoc(workspaceId);
  }
  const [data, loading, error] = useDocumentData(docRef);
  useFirestoreErrorMessaging(error);
  return { workspace: data ? transformWorkspace(data) : data, loading, error };
};
export const useMembersQuery = (workspaceId: string) => {
  const q = query(
    collections.members.get(),
    where("workspaceId", "==", workspaceId)
  );
  const [members, loading, error] = useCollectionData(q, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    members: members?.map((x) => transformMembership(x)),
    loading,
    error,
  };
};
export const useWorkspacesByKeysQuery = (keys?: string[]) => {
  const q =
    keys && keys.length > 0
      ? query(collections.workspaces.get(), where(documentId(), "in", keys))
      : null;
  const [data, loading, error] = useCollectionData(q, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    workspaces: data?.map((x) => transformWorkspace(x)),
    loading,
    error,
  };
};

export const useMembershipsByUserIdQuery = (userId?: string) => {
  const q = userId
    ? query(collections.members.get(), where("userId", "==", userId))
    : null;
  const [data, loading, error] = useCollectionData(q, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    members: data?.map((x) => transformMembership(x)),
    loading,
    error,
  };
};
export const getMemberById = (userId: string) => {
  const q = query(collections.members.get(), where("userId", "==", userId));
  return getDocs(q);
};
export const addMember = (member: WorkspaceRoleBody) => {
  return addDoc(collections.members.get(), member);
};
export const useUserMemberForWorkspaceQuery = (
  workspaceId?: string,
  userId?: string
) => {
  const q =
    workspaceId && userId
      ? query(
          collections.members.get(),
          where("userId", "==", userId),
          where("workspaceId", "==", workspaceId)
        )
      : null;
  const [data, loading, error] = useCollectionData(q, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    memberships: data?.map((x) => transformMembership(x)),
    loading,
    error,
  };
};

export const createWorkspace = (workspace: WorkspaceBody) => {
  const col = collections.workspaces.get();
  return addDoc(col, { ...workspace });
};

export const updateWorkspace = (
  id: string,
  workspace: Partial<WorkspaceBody>
) => {
  const docRef = collections.workspaces.getDoc(id);
  return setDoc(docRef, workspace);
};
export const WorkspaceCollections = collections;
