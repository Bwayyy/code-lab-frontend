import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import {
  LiveCodingRoom,
  LiveCodingRoomBody,
  UserRoomPermissionBody,
} from "../../types/live-coding-types";
import {
  transformLiveCoding,
  transformPermission,
} from "../data-transform/live-coding-transform";
import { fireStore } from "../firebaseApp";
import {
  firestoreFetchOptions,
  WorkspaceCollections,
} from "./workspace-collection";
type PermissionPath = {
  workspaceId?: string;
  liveCodingId?: string;
};
const collections = {
  liveCodings: {
    get: (workspaceId: string) =>
      collection(
        fireStore,
        WorkspaceCollections.workspaces.get().path +
          "/" +
          workspaceId +
          "/" +
          "liveCodings"
      ),
    getDoc: (workspaceId: string, liveCodingId: string) =>
      doc(
        fireStore,
        collections.liveCodings.get(workspaceId).path,
        liveCodingId
      ),
  },
  userPermission: {
    get: (workspaceId: string, liveCodingId: string) =>
      collection(
        fireStore,
        collections.liveCodings.get(workspaceId).path +
          "/" +
          liveCodingId +
          "/userPermission"
      ),
    getDoc: (workspaceId: string, liveCodingId: string, userId: string) =>
      doc(
        fireStore,
        collections.userPermission.get(workspaceId, liveCodingId).path,
        userId
      ),
  },
};
export const useLiveCodingsQuery = (workspaceId?: string) => {
  const col = workspaceId ? collections.liveCodings.get(workspaceId) : null;
  const [data, loading, error] = useCollectionData(col, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    liveCodings: data?.map((x) => transformLiveCoding(x)),
    loading,
    error,
  };
};
export const useLiveCodingPermissionQuery = (
  workspaceId?: string,
  liveCodingId?: string,
  userId?: string
) => {
  const docRef =
    workspaceId && liveCodingId && userId
      ? collections.userPermission.getDoc(workspaceId, liveCodingId, userId)
      : null;
  const [data, loading, error] = useDocumentData(docRef, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    permission: data ? transformPermission(data) : undefined,
    loading,
    error,
  };
};
export const updatePermission = (
  { workspaceId, liveCodingId }: PermissionPath,
  userId?: string,
  permission?: UserRoomPermissionBody
) => {
  if (workspaceId && liveCodingId && userId) {
    const docRef = collections.userPermission.getDoc(
      workspaceId,
      liveCodingId,
      userId
    );
    return setDoc(docRef, permission);
  }
};

export const addLiveCoding = (
  workspaceId?: string,
  data?: LiveCodingRoomBody
) => {
  if (workspaceId) {
    const col = collections.liveCodings.get(workspaceId);
    return addDoc(col, data);
  }
};
export const updateLiveCoding = (
  workspaceId?: string,
  liveCodingId?: string,
  data?: LiveCodingRoomBody
) => {
  if (workspaceId && liveCodingId) {
    const doc = collections.liveCodings.getDoc(workspaceId, liveCodingId);
    return setDoc(doc, data);
  }
};
export const deleteLiveCoding = (
  workspaceId?: string,
  liveCodingId?: string
) => {
  if (workspaceId && liveCodingId) {
    const doc = collections.liveCodings.getDoc(workspaceId, liveCodingId);
    return deleteDoc(doc);
  }
};

export const liveCodingCollections = collections;
