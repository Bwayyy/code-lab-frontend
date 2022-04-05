import { collection, doc, documentId, query, where } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
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
  return { workspace: data ? transformWorkspace(data) : data, loading, error };
};
export const useMembersQuery = (workspaceId: string) => {
  const q = query(
    collections.members.get(),
    where("workspaceId", "==", workspaceId)
  );
  const [members, loading, error] = useCollectionData(q, firestoreFetchOptions);
  return {
    members: members?.map((x) => transformMembership(x)),
    loading,
    error,
  };
};
export const useWorkspacesByKeysQuery = (keys?: string[]) => {
  const q = keys
    ? query(collections.workspaces.get(), where(documentId(), "in", keys))
    : null;
  const [data, loading, error] = useCollectionData(q, firestoreFetchOptions);
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
  return {
    members: data?.map((x) => transformMembership(x)),
    loading,
    error,
  };
};
export const WorkspaceCollections = collections;
