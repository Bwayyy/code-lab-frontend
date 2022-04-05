import { collection, doc, setDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import { transformRepository } from "../data-transform/live-coding-transform";
import { fireStore } from "../firebaseApp";
import { liveCodingCollections } from "./livecoding-collection";
type CollectionParents = {
  workspaceId: string;
  liveCodingId: string;
};
const collections = {
  repository: {
    get: ({ workspaceId, liveCodingId }: CollectionParents) =>
      collection(
        fireStore,
        liveCodingCollections.liveCodings.get(workspaceId).path +
          "/" +
          liveCodingId +
          "/repository"
      ),
  },
};
export const useRepositoryQuery = (parents: CollectionParents) => {
  const col = collections.repository.get(parents);
  const [data, loading, error] = useDocumentData(
    doc(fireStore, col.path + "/0")
  );
  useFirestoreErrorMessaging(error);
  const repository = useMemo(() => transformRepository(data), [data]);
  return {
    repository,
    loading,
    error,
  };
};

export const saveRepository = async (
  parents: CollectionParents,
  json: string
) => {
  const col = collections.repository.get(parents);
  const ref = doc(fireStore, col.path + "/0");
  return await setDoc(ref, { json });
};

export const repositoryCollections = collections;
