import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import { transformLiveCoding } from "../data-transform/live-coding-transform";
import { fireStore } from "../firebaseApp";
import {
  firestoreFetchOptions,
  WorkspaceCollections,
} from "./workspace-collection";
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
export const liveCodingCollections = collections;
